param(
  [Parameter(Mandatory = $true)] [string] $Corpus,
  [Parameter(Mandatory = $true)] [string] $RtkExe,
  [Parameter(Mandatory = $true)] [string] $Scratch
)

$ErrorActionPreference = 'Stop'
$env:RTK_TELEMETRY_DISABLED = '1'
$env:NO_COLOR = '1'

function Measure-Text([string] $Text) {
  $bytes = [Text.Encoding]::UTF8.GetByteCount($Text)
  $nonEmptyLines = @($Text -split "`n" | Where-Object { $_.Trim().Length -gt 0 }).Count
  [pscustomobject]@{
    utf8Bytes = $bytes
    nonEmptyLines = $nonEmptyLines
    estimatedTokens = [int][Math]::Ceiling($bytes / 4)
  }
}

function Measure-Retention([string] $Text, $Entities) {
  $total = @($Entities).Count
  $survived = @($Entities | Where-Object { $Text.Contains([string] $_) }).Count
  [pscustomobject]@{
    total = $total
    survived = $survived
    score = if ($total -eq 0) { 1 } else { [Math]::Round($survived / $total, 4) }
    lost = @($Entities | Where-Object { -not $Text.Contains([string] $_) })
  }
}

function Get-Median([object[]] $Values) {
  $sorted = @($Values | ForEach-Object { [double] $_ } | Sort-Object)
  if ($sorted.Count -eq 0) { return 0 }
  $middle = [int][Math]::Floor($sorted.Count / 2)
  if (($sorted.Count % 2) -eq 1) {
    return [double] $sorted[$middle]
  }
  return ([double] $sorted[$middle - 1] + [double] $sorted[$middle]) / 2
}

function Get-Spread([object[]] $Values) {
  $sorted = @($Values | ForEach-Object { [double] $_ } | Sort-Object)
  if ($sorted.Count -eq 0) {
    return [pscustomobject]@{ min = 0; max = 0 }
  }
  [pscustomobject]@{
    min = [Math]::Round($sorted[0], 3)
    max = [Math]::Round($sorted[$sorted.Count - 1], 3)
  }
}

function Invoke-Rtk([string[]] $Arguments, [string] $InputText) {
  $psi = [Diagnostics.ProcessStartInfo]::new()
  $psi.FileName = $RtkExe
  $psi.UseShellExecute = $false
  $psi.CreateNoWindow = $true
  $psi.RedirectStandardInput = $true
  $psi.RedirectStandardOutput = $true
  $psi.RedirectStandardError = $true
  $psi.StandardInputEncoding = [Text.UTF8Encoding]::new($false)
  $psi.StandardOutputEncoding = [Text.UTF8Encoding]::new($false)
  $psi.StandardErrorEncoding = [Text.UTF8Encoding]::new($false)
  foreach ($argument in $Arguments) { [void] $psi.ArgumentList.Add($argument) }
  $process = [Diagnostics.Process]::new()
  $process.StartInfo = $psi
  $timer = [Diagnostics.Stopwatch]::StartNew()
  [void] $process.Start()
  if ($null -ne $InputText) {
    $process.StandardInput.Write($InputText)
  }
  $process.StandardInput.Close()
  $stdoutTask = $process.StandardOutput.ReadToEndAsync()
  $stderrTask = $process.StandardError.ReadToEndAsync()
  $process.WaitForExit()
  $timer.Stop()
  [pscustomobject]@{
    output = $stdoutTask.GetAwaiter().GetResult()
    error = $stderrTask.GetAwaiter().GetResult()
    exitCode = $process.ExitCode
    elapsedMs = $timer.Elapsed.TotalMilliseconds
  }
}

$corpusData = Get-Content -Raw -LiteralPath $Corpus | ConvertFrom-Json
$jsonPath = Join-Path $Scratch 'json-tool-output.json'
$jsonCase = $corpusData.cases | Where-Object { $_.id -eq 'json-tool-output' }
[IO.File]::WriteAllText($jsonPath, $jsonCase.input, [Text.UTF8Encoding]::new($false))

$filters = @{
  'git-status' = 'git-status'
  'git-diff' = 'git-diff'
  'rg-search' = 'rg'
  # The fixture models the repository's unittest command; use the generic log
  # filter rather than claiming pytest parser coverage.
  'pytest-or-unittest' = 'log'
  'npm-or-build' = 'log'
}

$rows = [System.Collections.Generic.List[object]]::new()
foreach ($case in $corpusData.cases) {
  if ($case.id -eq 'json-tool-output') {
    $arguments = @('json', $jsonPath)
  } else {
    $arguments = @('pipe', '--filter', $filters[$case.id])
  }

  # One filter-only warm-up is discarded before the three reported runs.
  if ($case.id -eq 'json-tool-output') {
    [void] (Invoke-Rtk $arguments $null)
  } else {
    [void] (Invoke-Rtk $arguments $case.input)
  }

  $rawMetrics = Measure-Text $case.input
  for ($rep = 1; $rep -le 3; $rep++) {
    if ($case.id -eq 'json-tool-output') {
      $filtered = Invoke-Rtk $arguments $null
    } else {
      $filtered = Invoke-Rtk $arguments $case.input
    }
    $output = [string]$filtered.output
    $compressedMetrics = Measure-Text $output
    $retention = Measure-Retention $output $case.technicalEntities
    $rows.Add([pscustomobject]@{
      case = $case.id
      repetition = $rep
      raw = $rawMetrics
      filteredElapsedMs = [Math]::Round($filtered.elapsedMs, 3)
      filteredExitCode = $filtered.exitCode
      output = $compressedMetrics
      retention = $retention
      stderr = $filtered.error.Trim()
    })
  }
}

$summaries = foreach ($case in $corpusData.cases) {
  $caseRows = @($rows | Where-Object { $_.case -eq $case.id })
  $outputBytes = Get-Median @($caseRows | ForEach-Object { $_.output.utf8Bytes })
  $outputLines = Get-Median @($caseRows | ForEach-Object { $_.output.nonEmptyLines })
  $outputTokens = Get-Median @($caseRows | ForEach-Object { $_.output.estimatedTokens })
  $retentionScore = Get-Median @($caseRows | ForEach-Object { $_.retention.score })
  $latencyValues = @($caseRows | ForEach-Object { $_.filteredElapsedMs })
  $latencySpread = Get-Spread $latencyValues
  [pscustomobject]@{
    case = $case.id
    operation = if ($case.id -eq 'json-tool-output') { 'json' } else { "pipe --filter $($filters[$case.id])" }
    repetitions = $caseRows.Count
    raw = $caseRows[0].raw
    output = [pscustomobject]@{
      utf8Bytes = [int][Math]::Round($outputBytes)
      nonEmptyLines = [int][Math]::Round($outputLines)
      estimatedTokens = [int][Math]::Round($outputTokens)
    }
    reductionPercent = [Math]::Round((1 - ($outputBytes / $caseRows[0].raw.utf8Bytes)) * 100, 1)
    retentionPercent = [Math]::Round($retentionScore * 100, 1)
    filteredLatencyMs = [pscustomobject]@{
      median = [Math]::Round((Get-Median $latencyValues), 3)
      spread = $latencySpread
    }
    filteredExitCodes = @($caseRows | ForEach-Object { $_.filteredExitCode } | Sort-Object -Unique)
    stderrCount = @($caseRows | Where-Object { $_.stderr.Length -gt 0 }).Count
    lostEntities = @($caseRows | ForEach-Object { $_.retention.lost } | Sort-Object -Unique)
  }
}

$noisyCaseIds = @('git-diff', 'rg-search', 'pytest-or-unittest', 'npm-or-build')
$noisySummaries = @($summaries | Where-Object { $noisyCaseIds -contains $_.case })
$aggregate = [pscustomobject]@{
  allCases = [pscustomobject]@{
    caseCount = @($summaries).Count
    reductionPercent = [Math]::Round((Get-Median @($summaries | ForEach-Object { $_.reductionPercent })), 1)
    retentionPercent = [Math]::Round((Get-Median @($summaries | ForEach-Object { $_.retentionPercent })), 1)
  }
  noisyCases = [pscustomobject]@{
    caseIds = $noisyCaseIds
    caseCount = $noisySummaries.Count
    reductionPercent = [Math]::Round((Get-Median @($noisySummaries | ForEach-Object { $_.reductionPercent })), 1)
    retentionPercent = [Math]::Round((Get-Median @($noisySummaries | ForEach-Object { $_.retentionPercent })), 1)
  }
  latencyBaseline = 'UNMEASURED: the fixture runner does not execute a comparable original command.'
  wrapperCoverage = 'UNMEASURED: the fixture runner invokes pipe filters and json, not producer commands through rtk wrappers.'
}

[pscustomobject]@{
  schema = 'dova-ai-workstation-phase2-benchmark-v2'
  evaluationScope = 'RTK filter/JSON transformations only; original command execution and command-wrapper status propagation are unmeasured.'
  warmupPerCase = 1
  repetitionsPerCase = 3
  measurements = @($rows)
  summaries = @($summaries)
  aggregate = $aggregate
} | ConvertTo-Json -Depth 10
