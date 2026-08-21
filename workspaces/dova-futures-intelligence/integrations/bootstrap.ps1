[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"
$PSNativeCommandUseErrorActionPreference = $true
$integrationRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

Push-Location $integrationRoot
try {
    if (Test-Path "package-lock.json") {
        npm ci --ignore-scripts
    }
    else {
        npm install --ignore-scripts
    }

    if (-not (Test-Path ".venv")) {
        python -m venv .venv
    }

    & ".venv\Scripts\python.exe" -m pip install --upgrade pip
    & ".venv\Scripts\python.exe" -m pip install -r requirements-tools.txt
    & ".\agent-reach.ps1" install --env=auto

    npm run doctor
}
finally {
    Pop-Location
}
