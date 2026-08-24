"use client";

import { useEffect, useState } from "react";
import type { GitHubProduct } from "../types/integrations";

type GitHubProductState = {
  products: GitHubProduct[];
  loading: boolean;
  error: string | null;
  refreshedAt: string | null;
};

export function useGitHubProducts(): GitHubProductState {
  const [state, setState] = useState<GitHubProductState>({ products: [], loading: true, error: null, refreshedAt: null });

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/github", { signal: controller.signal })
      .then(async (response) => {
        const payload = await response.json() as { products?: GitHubProduct[]; refreshedAt?: string; error?: string };
        if (!response.ok || !payload.products) throw new Error(payload.error || "GitHub status is unavailable.");
        setState({ products: payload.products, loading: false, error: null, refreshedAt: payload.refreshedAt || null });
      })
      .catch((cause) => {
        if (cause instanceof DOMException && cause.name === "AbortError") return;
        setState({ products: [], loading: false, error: cause instanceof Error ? cause.message : "GitHub status is unavailable.", refreshedAt: null });
      });
    return () => controller.abort();
  }, []);

  return state;
}
