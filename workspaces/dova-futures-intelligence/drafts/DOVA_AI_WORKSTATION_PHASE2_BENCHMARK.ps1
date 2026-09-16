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
  $passthroughArguments = @('pipe', '--passthrough')

  # One warm-up per condition is discarded before the three reported runs.
  [void] (Invoke-Rtk $passthroughArguments $case.input)
  if ($case.id -eq 'json-tool-output') {
    [void] (Invoke-Rtk $arguments $null)
  } else {
    [void] (Invoke-Rtk $arguments $case.input)
  }

  $rawMetrics = Measure-Text $case.input
  for ($rep = 1; $rep -le 3; $rep++) {
    $rawTimer = [Diagnostics.Stopwatch]::StartNew()
    $rawText = [string]::Copy($case.input)
    $rawTimer.Stop()
    $pass = Invoke-Rtk $passthroughArguments $case.input
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
      rawElapsedMs = [Math]::Round($rawTimer.Elapsed.TotalMilliseconds, 3)
      passthroughElapsedMs = [Math]::Round($pass.elapsedMs, 3)
      filteredElapsedMs = [Math]::Round($filtered.elapsedMs, 3)
      passthroughExitCode = $pass.exitCode
      filteredExitCode = $filtered.exitCode
      output = $compressedMetrics
      retention = $retention
      stderr = $filtered.error.Trim()
    })
  }
}

$rows | ConvertTo-Json -Depth 8
