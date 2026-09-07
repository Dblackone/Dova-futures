"use client";

import { InteractionRequiredAuthError, PublicClientApplication, type AccountInfo } from "@azure/msal-browser";
import { useCallback, useEffect, useRef, useState } from "react";
import type { OneDriveConfig, OneDriveItem } from "../types/integrations";

type OneDriveState = {
  config: OneDriveConfig | null;
  account: AccountInfo | null;
  items: OneDriveItem[];
  loading: boolean;
  connecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
  loadItems: (query?: string) => Promise<void>;
};

function encodedDrivePath(path: string): string {
  return path.split("/").map((segment) => encodeURIComponent(segment.trim())).filter(Boolean).join("/");
}

export function useOneDrive(): OneDriveState {
  const appRef = useRef<PublicClientApplication | null>(null);
  const [config, setConfig] = useState<OneDriveConfig | null>(null);
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [items, setItems] = useState<OneDriveItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch("/api/onedrive/config");
        const nextConfig = await response.json() as OneDriveConfig & { error?: string };
        if (!response.ok) throw new Error(nextConfig.error || "OneDrive configuration is unavailable.");
        if (cancelled) return;
        setConfig(nextConfig);
        if (!nextConfig.configured || !nextConfig.clientId || !nextConfig.tenantId) return;

        const application = new PublicClientApplication({
          auth: {
            clientId: nextConfig.clientId,
            authority: `https://login.microsoftonline.com/${nextConfig.tenantId}`,
            redirectUri: window.location.origin,
          },
          cache: { cacheLocation: "sessionStorage" },
        });
        await application.initialize();
        const redirect = await application.handleRedirectPromise();
        const activeAccount = redirect?.account || application.getAllAccounts()[0] || null;
        if (activeAccount) application.setActiveAccount(activeAccount);
        if (!cancelled) {
          appRef.current = application;
          setAccount(activeAccount);
        }
      } catch (cause) {
        if (!cancelled) setError(cause instanceof Error ? cause.message : "OneDrive configuration is unavailable.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const connect = useCallback(async () => {
    if (!appRef.current || !config?.configured) return;
    setConnecting(true);
    setError(null);
    try {
      const result = await appRef.current.loginPopup({ scopes: config.scopes, prompt: "select_account" });
      appRef.current.setActiveAccount(result.account);
      setAccount(result.account);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Microsoft sign-in was not completed.");
    } finally {
      setConnecting(false);
    }
  }, [config]);

  const loadItems = useCallback(async (query = "") => {
    const application = appRef.current;
    if (!application || !account || !config?.rootPath) return;
    setLoading(true);
    setError(null);
    try {
      let token;
      try {
        token = await application.acquireTokenSilent({ account, scopes: config.scopes });
      } catch (cause) {
        if (!(cause instanceof InteractionRequiredAuthError)) throw cause;
        token = await application.acquireTokenPopup({ account, scopes: config.scopes });
      }

      const root = encodedDrivePath(config.rootPath);
      const searchText = encodeURIComponent(query.trim().replaceAll("'", "''"));
      const resource = query.trim()
        ? `root:/${root}:/search(q='${searchText}')`
        : `root:/${root}:/children`;
      const response = await fetch(
        `https://graph.microsoft.com/v1.0/me/drive/${resource}?$select=id,name,size,lastModifiedDateTime,webUrl,folder,file&$top=200`,
        { headers: { authorization: `Bearer ${token.accessToken}` } },
      );
      const payload = await response.json() as { value?: OneDriveItem[]; error?: { message?: string } };
      if (!response.ok || !payload.value) throw new Error(payload.error?.message || "OneDrive could not return this folder.");
      setItems(payload.value);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "OneDrive could not return this folder.");
    } finally {
      setLoading(false);
    }
  }, [account, config]);

  return { config, account, items, loading, connecting, error, connect, loadItems };
}
