"use client";

import * as React from "react";
import {
  Github,
  Star,
  GitFork,
  FolderGit2,
  Loader2,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const GITHUB_USERNAME = "ParsaGg";

type GithubData = {
  repos: number;
  stars: number;
  forks: number;
  followers: number;
  login: string | null;
  cached: boolean;
  fetchedAt: string;
  error?: string;
};

async function fetchGithubData(): Promise<GithubData> {
  const [reposRes, profileRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }),
  ]);

  if (!reposRes.ok || !profileRes.ok) {
    throw new Error(reposRes.status === 403 || profileRes.status === 403 ? "rate_limited" : "github_unavailable");
  }

  const repos: Array<{
    stargazers_count: number;
    forks_count: number;
    fork: boolean;
  }> = await reposRes.json();
  const profile: { followers?: number; login?: string } = await profileRes.json();

  const totals = repos.reduce(
    (acc, repo) => {
      if (repo.fork) return acc;
      acc.repos += 1;
      acc.stars += repo.stargazers_count || 0;
      acc.forks += repo.forks_count || 0;
      return acc;
    },
    { repos: 0, stars: 0, forks: 0 }
  );

  return {
    ...totals,
    followers: profile.followers || 0,
    login: profile.login || GITHUB_USERNAME,
    cached: false,
    fetchedAt: new Date().toISOString(),
  };
}

function unavailableData(error = "fetch_failed"): GithubData {
  return {
    repos: 0,
    stars: 0,
    forks: 0,
    followers: 0,
    login: GITHUB_USERNAME,
    cached: false,
    fetchedAt: new Date().toISOString(),
    error,
  };
}

function useCountUp(target: number, duration = 900) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(Math.max(target, 0) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

function StatCell({
  icon,
  value,
  label,
  hint,
  loading,
  live,
  unavailable,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  hint: string;
  loading: boolean;
  live?: boolean;
  unavailable?: boolean;
}) {
  const display = useCountUp(value);
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card/60 p-4 backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_10px_28px_-14px_var(--glow)]">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">{icon}</span>
        {live && !unavailable && (
          <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-primary/80">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            live
          </span>
        )}
        {unavailable && (
          <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            <AlertTriangle className="h-3 w-3" />
            retry
          </span>
        )}
      </div>
      <div className="mt-3 font-serif text-4xl font-semibold tabular-nums tracking-tight">
        {loading ? (
          <Loader2 className="h-7 w-7 animate-spin text-muted-foreground" />
        ) : unavailable ? (
          <span className="text-muted-foreground">—</span>
        ) : (
          display
        )}
      </div>
      <div className="mt-1 font-mono text-xs text-foreground">{label}</div>
      <div className="font-mono text-[10px] text-muted-foreground">{hint}</div>
    </div>
  );
}

export function GitHubStats() {
  const [data, setData] = React.useState<GithubData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [nonce, setNonce] = React.useState(0);

  React.useEffect(() => {
    const controller = new AbortController();
    fetchGithubData()
      .then((json) => {
        if (!controller.signal.aborted) setData(json);
      })
      .catch((error: Error) => {
        if (!controller.signal.aborted) setData(unavailableData(error.message));
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [nonce]);

  const unavailable = !!data?.error;
  const cells = [
    {
      icon: <FolderGit2 className="h-5 w-5" />,
      value: data?.repos ?? 0,
      label: "Public Repos",
      hint: unavailable ? "GitHub API" : `@${data?.login ?? GITHUB_USERNAME}`,
      live: true,
    },
    {
      icon: <Star className="h-5 w-5" />,
      value: data?.stars ?? 0,
      label: "Stars Earned",
      hint: unavailable ? "temporarily limited" : "across repositories",
      live: true,
    },
    {
      icon: <GitFork className="h-5 w-5" />,
      value: data?.forks ?? 0,
      label: "Forks",
      hint: unavailable ? "try refresh" : "community usage",
      live: true,
    },
    {
      icon: <Github className="h-5 w-5" />,
      value: data?.followers ?? 0,
      label: "Followers",
      hint: unavailable ? "rate-limited" : data?.cached ? "cached" : "synced now",
      live: true,
    },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {cells.map((c, i) => (
          <StatCell
            key={i}
            {...c}
            loading={loading}
            unavailable={unavailable}
          />
        ))}
      </div>
      {unavailable && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/60 bg-muted/20 px-4 py-2.5 font-mono text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <AlertTriangle className="h-3.5 w-3.5 text-primary" />
            GitHub API is rate-limited from this browser — counters will populate
            automatically once the limit resets.
          </span>
          <button
            type="button"
            onClick={() => {
              setLoading(true);
              setNonce((n) => n + 1);
            }}
            className="focus-glow inline-flex items-center gap-1.5 rounded-md border border-border bg-background/40 px-2.5 py-1 text-foreground transition-colors hover:border-primary/40"
          >
            <RefreshCw className="h-3 w-3" />
            retry
          </button>
        </div>
      )}
    </div>
  );
}

export function GitHubStatBadge({ className }: { className?: string }) {
  const [data, setData] = React.useState<GithubData | null>(null);
  React.useEffect(() => {
    const controller = new AbortController();
    fetchGithubData()
      .then((json) => {
        if (!controller.signal.aborted) setData(json);
      })
      .catch(() => {
        if (!controller.signal.aborted) setData(unavailableData());
      });
    return () => controller.abort();
  }, []);

  if (data?.error) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-2.5 py-1 font-mono text-xs text-muted-foreground",
          className
        )}
        title="GitHub API rate-limited"
      >
        <Star className="h-3 w-3" />
        <span>—</span>
        <GitFork className="ml-1 h-3 w-3" />
        <span>—</span>
      </span>
    );
  }
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-2.5 py-1 font-mono text-xs",
        className
      )}
      title={`Stars: ${data?.stars ?? "…"} · Forks: ${data?.forks ?? "…"}`}
    >
      <Star className="h-3 w-3 text-primary" />
      <span className="tabular-nums">{data?.stars ?? "…"}</span>
      <GitFork className="ml-1 h-3 w-3 text-primary" />
      <span className="tabular-nums">{data?.forks ?? "…"}</span>
    </span>
  );
}
