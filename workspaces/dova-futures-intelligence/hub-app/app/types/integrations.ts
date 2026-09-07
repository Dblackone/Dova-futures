export type GitHubProduct = {
  slug: "hub" | "website" | "preorder";
  name: string;
  repository: string;
  url: string;
  visibility: string;
  defaultBranch: string;
  pushedAt: string | null;
  archived: boolean;
  openIssues: number;
};

export type OneDriveConfig = {
  configured: boolean;
  clientId: string | null;
  tenantId: string | null;
  rootPath: string | null;
  scopes: string[];
};

export type OneDriveItem = {
  id: string;
  name: string;
  size: number;
  webUrl: string;
  lastModifiedDateTime: string;
  folder?: { childCount: number };
  file?: { mimeType: string };
};
