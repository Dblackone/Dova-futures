[CmdletBinding()]
param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$AgentReachArguments
)

$ErrorActionPreference = "Stop"
$venvScripts = Join-Path $PSScriptRoot ".venv\Scripts"
$agentReach = Join-Path $venvScripts "agent-reach.exe"

if (-not (Test-Path $agentReach)) {
    throw "Agent Reach is not installed. Run bootstrap.ps1 first."
}

$env:PATH = "$venvScripts;$env:PATH"
& $agentReach @AgentReachArguments
exit $LASTEXITCODE
