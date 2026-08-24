"use client";

import { FormEvent, useMemo, useState } from "react";
import { useOneDrive } from "../hooks/use-onedrive";

interface OneDriveLibraryProps {
  readonly kind: "projects" | "files";
}

function formatSize(bytes: number): string {
  if (!bytes) return "—";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function OneDriveLibrary({ kind }: Readonly<OneDriveLibraryProps>) {
  const { config, account, items, loading, connecting, error, connect, loadItems } = useOneDrive();
  const [query, setQuery] = useState("");
  const visibleItems = useMemo(
    () => items.filter((item) => kind === "projects" ? Boolean(item.folder) : Boolean(item.file)),
    [items, kind],
  );

  function search(event: FormEvent) {
    event.preventDefault();
    void loadItems(query);
  }

  if (loading && !config) {
    return <section className="panel empty-state"><div className="empty-state-inner"><h3>Checking Microsoft connection…</h3></div></section>;
  }

  if (!config?.configured) {
    return <section className="panel empty-state"><div className="empty-state-inner"><div className="empty-symbol">☁</div><h3>OneDrive setup is ready for owner registration</h3><p>The Hub code is prepared, but Microsoft still needs the application ID, tenant ID and approved DOVA root folder.</p><div className="policy-box">Required server settings: MICROSOFT_CLIENT_ID, MICROSOFT_TENANT_ID and ONEDRIVE_ROOT_PATH. The first connection requests read-only Files.Read access.</div></div></section>;
  }

  if (!account) {
    return <section className="panel empty-state"><div className="empty-state-inner"><div className="empty-symbol">1D</div><h3>Connect your approved OneDrive account</h3><p>Microsoft will show the exact read-only permissions before you approve them. The Hub will read names and metadata from <strong>{config.rootPath}</strong>.</p><button className="button primary" onClick={() => void connect()} disabled={connecting}>{connecting ? "Opening Microsoft…" : "Connect OneDrive"}</button>{error ? <p className="error-note">{error}</p> : null}</div></section>;
  }

  return <section className="panel cloud-browser">
    <div className="panel-head"><div><strong>{kind === "projects" ? "Project folders" : "OneDrive files"}</strong><span className="card-note cloud-account">{account.username} · {config.rootPath}</span></div><button className="button secondary" onClick={() => void loadItems()}>Refresh</button></div>
    {kind === "files" ? <form className="cloud-search" onSubmit={search}><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search approved OneDrive files…" aria-label="Search OneDrive files" /><button className="button primary" disabled={loading}>{loading ? "Searching…" : "Search"}</button></form> : null}
    {kind === "projects" && !items.length ? <button className="button primary" onClick={() => void loadItems()} disabled={loading}>{loading ? "Loading…" : "Load project folders"}</button> : null}
    {error ? <p className="error-note">{error}</p> : null}
    <div className="cloud-list">
      {visibleItems.map((item) => <article className="cloud-item" key={item.id}><span className="row-icon">{item.folder ? "◇" : "▤"}</span><div className="row-copy"><strong>{item.name}</strong><small>{item.folder ? `${item.folder.childCount} items` : formatSize(item.size)} · Updated {new Date(item.lastModifiedDateTime).toLocaleDateString()}</small></div><a className="button secondary" href={item.webUrl} target="_blank" rel="noreferrer">Open in OneDrive</a></article>)}
      {!loading && items.length > 0 && visibleItems.length === 0 ? <p className="card-note">No {kind} matched this view.</p> : null}
    </div>
    {kind === "files" ? <div className="policy-box">Document creation remains approval-gated. The first connection is read-only; Files.ReadWrite will be requested only when the OneDrive template/output folder is approved.</div> : null}
  </section>;
}
