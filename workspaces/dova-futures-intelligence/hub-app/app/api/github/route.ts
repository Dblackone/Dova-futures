import { getChatGPTUser } from "../../chatgpt-auth";
import type { GitHubProduct } from "../../types/integrations";

const repositories = [
  { slug: "hub", name: "DOVA Hub", repository: "Dblackone/Dova-futures" },
  { slug: "website", name: "DOVA Website", repository: "Dblackone/Dova-futures-website" },
  { slug: "preorder", name: "DOVA Pre-order", repository: "Dblackone/Dova-preorder" },
] as const;

const CACHE_TTL_MS = 5 * 60 * 1000;
let cached: { expiresAt: number; products: GitHubProduct[]; refreshedAt: string } | null = null;

type GitHubRepositoryResponse = {
  html_url: string;
  visibility?: string;
  private: boolean;
  default_branch: string;
  pushed_at: string | null;
  archived: boolean;
  open_issues_count: number;
};

export async function GET() {
  if (!await getChatGPTUser()) {
    return Response.json({ error: "Authentication required." }, { status: 401, headers: { "cache-control": "no-store" } });
  }

  if (cached && cached.expiresAt > Date.now()) {
    return Response.json({ products: cached.products, refreshedAt: cached.refreshedAt }, { headers: { "cache-control": "private, max-age=60" } });
  }

  const headers: Record<string, string> = {
    accept: "application/vnd.github+json",
    "user-agent": "DOVA-Futures-Hub",
    "x-github-api-version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const products = await Promise.all(repositories.map(async (product): Promise<GitHubProduct> => {
      const response = await fetch(`https://api.github.com/repos/${product.repository}`, { headers });
      if (!response.ok) throw new Error(`GitHub returned ${response.status} for ${product.repository}`);
      const repository = await response.json() as GitHubRepositoryResponse;
      return {
        ...product,
        url: repository.html_url,
        visibility: repository.visibility || (repository.private ? "private" : "public"),
        defaultBranch: repository.default_branch,
        pushedAt: repository.pushed_at,
        archived: repository.archived,
        openIssues: repository.open_issues_count,
      };
    }));
    const refreshedAt = new Date().toISOString();
    cached = { products, refreshedAt, expiresAt: Date.now() + CACHE_TTL_MS };
    return Response.json({ products, refreshedAt }, { headers: { "cache-control": "private, max-age=60" } });
  } catch (cause) {
    console.error("GitHub status request failed", cause instanceof Error ? cause.message : cause);
    return Response.json({ error: "Live GitHub status is temporarily unavailable." }, { status: 502, headers: { "cache-control": "no-store" } });
  }
}
