import { getChatGPTUser } from "../../../chatgpt-auth";

const scopes = ["User.Read", "Files.Read"];

export async function GET() {
  if (!await getChatGPTUser()) {
    return Response.json({ error: "Authentication required." }, { status: 401, headers: { "cache-control": "no-store" } });
  }

  const clientId = process.env.MICROSOFT_CLIENT_ID || null;
  const tenantId = process.env.MICROSOFT_TENANT_ID || null;
  const rootPath = process.env.ONEDRIVE_ROOT_PATH || null;
  return Response.json({
    configured: Boolean(clientId && tenantId && rootPath),
    clientId,
    tenantId,
    rootPath,
    scopes,
  }, { headers: { "cache-control": "no-store" } });
}
