param(
  [Parameter(Mandatory = $true)] [string] $RtkExe,
  [Parameter(Mandatory = $true)] [string] $Scratch
)
# Regression checks for the Phase 2 evidence repairs. @lead/vector [codex]
$ErrorActionPreference = 'Stop'
$runner = Join-Path $PSScriptRoot 'DOVA_AI_WORKSTATION_PHASE2_BENCHMARK.ps1'
$corpus = Join-Path $PSScriptRoot 'DOVA_AI_WORKSTATION_PHASE2_CORPUS.json'
$tokens = $null
$errors = $null
$ast = [System.Management.Automation.Language.Parser]::ParseFile($runner, [ref]$tokens, [ref]$errors)
if ($errors.Count) { throw 'Runner does not parse' }
$ast.FindAll({ param($node)
  $node -is [System.Management.Automation.Language.FunctionDefinitionAst] -and $node.Name -eq 'Get-Median'
}, $true) | ForEach-Object { Invoke-Expression $_.Extent.Text }
if ((Get-Median @(99, 1, 5)) -ne 5) { throw 'Odd median regression' }
if ((Get-Median @(9, 1, 3, 5)) -ne 4) { throw 'Even median regression' }
if ((Get-Median @(7)) -ne 7) { throw 'Singleton median regression' }

$result = (& $runner -Corpus $corpus -RtkExe $RtkExe -Scratch $Scratch) | ConvertFrom-Json
if (@($result.measurements).Count -ne 18 -or @($result.summaries).Count -ne 6) { throw 'Measurement count regression' }
foreach ($summary in $result.summaries) {
  $rows = @($result.measurements | Where-Object case -eq $summary.case)
  $times = @($rows.filteredElapsedMs | Sort-Object)
  if ($rows.Count -ne 3 -or $summary.filteredLatencyMs.median -ne $times[1] -or
      $summary.filteredLatencyMs.spread.min -ne $times[0] -or
      $summary.filteredLatencyMs.spread.max -ne $times[2]) { throw 'Timing summary regression' }
  if (@($rows | Where-Object { $_.filteredExitCode -ne 0 -or $_.stderr }).Count) { throw 'Filter process failure' }
}
if ($result.aggregate.allCases.retentionPercent -ne 83.3 -or
    $result.aggregate.noisyCases.retentionPercent -ne 47.6 -or
    $result.aggregate.noisyCases.reductionPercent -ne 32.3) { throw 'Premature rounding regression' }
if ($result.aggregate.latencyBaseline -notlike 'UNMEASURED:*' -or
    $result.aggregate.wrapperCoverage -notlike 'UNMEASURED:*') { throw 'Unsupported coverage claim' }
$report = Get-Content (Join-Path $PSScriptRoot 'DOVA_AI_WORKSTATION_PHASE2_RESULTS.md')
$header = @($report | Where-Object { $_ -like '| Case |*' })[0]
$index = [Array]::IndexOf($report, $header)
if (($header -split '\|').Count -ne ($report[$index + 1] -split '\|').Count) { throw 'Markdown table column mismatch' }
foreach ($value in @('32.3%', '47.6%', '83.3%')) {
  if (($report -join "`n") -notlike "*$value*") { throw "Report missing $value" }
}
'PASS: medians, full-precision aggregates, 18 measurements, timing spreads, scope and report table.'
