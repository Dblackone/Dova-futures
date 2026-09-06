import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const integrationRoot = path.dirname(fileURLToPath(import.meta.url));
const windows = process.platform === "win32";

const checks = [
  ["Career Ops", "career-ops", "@santifer/career-ops"],
  ["HyperFrames", "hyperframes", "hyperframes"],
  ["World Monitor", "worldmonitor", "worldmonitor"],
];

let failed = false;

for (const [label, command, packageName] of checks) {
  const executable = path.join(integrationRoot, "node_modules", ".bin", `${command}${windows ? ".cmd" : ""}`);
  try {
    await access(executable, constants.X_OK);
    const manifestPath = path.join(integrationRoot, "node_modules", ...packageName.split("/"), "package.json");
    const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
    console.log(`PASS ${label}: ${manifest.version}`);
  } catch {
    failed = true;
    console.error(`FAIL ${label}: run npm ci in ${integrationRoot}`);
  }
}

const agentReach = path.join(integrationRoot, ".venv", windows ? "Scripts" : "bin", windows ? "agent-reach.exe" : "agent-reach");
try {
  await access(agentReach, constants.X_OK);
  console.log("PASS Agent Reach: isolated CLI installed");
} catch {
  failed = true;
  console.error(`FAIL Agent Reach: run bootstrap.ps1 in ${integrationRoot}`);
}

try {
  const response = await fetch("http://127.0.0.1:17493/profiles", {
    signal: AbortSignal.timeout(1_500),
  });
  console.log(response.ok ? "PASS Voicebox: local service reachable" : `WARN Voicebox: service returned HTTP ${response.status}`);
} catch {
  console.log("WARN Voicebox: desktop service is not running; install/start the upstream Windows app when voice I/O is needed");
}

if (failed) {
  process.exitCode = 1;
}
