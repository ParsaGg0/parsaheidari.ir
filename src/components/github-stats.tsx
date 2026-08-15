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
const GITHUB_API_VERSION = "2022-11-28";
const GITHUB_CACHE_MS = 10 * 60 * 1000;

type GithubData = {
  repos: number;
  stars: number;
  forks: number;
  followers: number;
  login: string;
  cached: boolean;
  fetchedAt: string;
  error?: string;
};

type GithubRepo = {
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
};

type GithubProfile = {
  followers: number;
  login: string;
};

type GithubCache = {
  expiresAt: number;
  data: GithubData;
};

let githubCache: GithubCache | null = null;
let githubRequest: Promise<GithubData> | null = null;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseGithubRepo(value: unknown): GithubRepo | null {
  if (!isRecord(value)) return null;
  const stargazersCount = value.stargazers_count;
  const forksCount = value.forks_count;
  const isFork = value.fork;

  if (
    typeof stargazersCount !== "number" ||
    typeof forksCount !== "number" ||
    typeof isFork !== "boolean"
  ) {
    return null;
  }

  return {
    stargazers_count: stargazersCount,
    forks_count: forksCount,
    fork: isFork,
  };
}

function parseGithubProfile(value: unknown): GithubProfile {
  if (!isRecord(value)) {
    throw new Error("invalid_github_profile");
  }

  const followers = value.followers;
  const login = value.login;

  if (typeof followers !== "number" || typeof login !== "string") {
    throw new Error("invalid_github_profile");
  }

  return { followers, login };
}

function parseGithubRepos(value: unknown): GithubRepo[] {
  if (!Array.isArray(value)) {
    throw new Error("invalid_github_repos");
  }

  return value.map(parseGithubRepo).filter((repo): repo is GithubRepo => repo !== null);
}

function unavailableGithubData(error = "fetch_failed"): GithubData {
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

async function fetchGithubJson(url: string): Promise<unknown> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": GITHUB_API_VERSION,
    },
  });

  if (!response.ok) {
    throw new Error(response.status === 403 ? "rate_limited" : "github_unavailable");
  }

  return response.json();
}

async function fetchFreshGithubData(): Promise<GithubData> {
  const [rawRepos, rawProfile] = await Promise.all([
    fetchGithubJson(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
    ),
    fetchGithubJson(`https://api.github.com/users/${GITHUB_USERNAME}`),
  ]);

  const repositories = parseGithubRepos(rawRepos);
  const profile = parseGithubProfile(rawProfile);

  const repositoryTotals = repositories.reduce(
    (totals, repository) => {
      if (repository.fork) return totals;
      return {
        repos: totals.repos + 1,
        stars: totals.stars + repository.stargazers_count,
        forks: totals.forks + repository.forks_count,
      };
    },
    { repos: 0, stars: 0, forks: 0 }
  );

  return {
    ...repositoryTotals,
    followers: profile.followers,
    login: profile.login,
    cached: false,
    fetchedAt: new Date().toISOString(),
  };
}

async function loadGithubData({ forceRefresh = false } = {}): Promise<GithubData> {
  const now = Date.now();

  if (!forceRefresh && githubCache && githubCache.expiresAt > now) {
    return { ...githubCache.data, cached: true };
  }

  if (!forceRefresh && githubRequest) {
    return githubRequest;
  }

  githubRequest = fetchFreshGithubData()
    .then((githubData) => {
      githubCache = {
        data: githubData,
        expiresAt: Date.now() + GITHUB_CACHE_MS,
      };
      return githubData;
    })
    .catch((error: Error) => unavailableGithubData(error.message))
    .finally(() => {
      githubRequest = null;
    });

  return githubRequest;
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
  const [githubData, setGithubData] = React.useState<GithubData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [refreshCount, setRefreshCount] = React.useState(0);

  React.useEffect(() => {
    let isActive = true;
    loadGithubData({ forceRefresh: refreshCount > 0 }).then((nextGithubData) => {
      if (!isActive) return;
      setGithubData(nextGithubData);
      setLoading(false);
    });

    return () => {
      isActive = false;
    };
  }, [refreshCount]);

  const unavailable = !!githubData?.error;
  const cells = [
    {
      icon: <FolderGit2 className="h-5 w-5" />,
      value: githubData?.repos ?? 0,
      label: "Public Repos",
      hint: unavailable ? "GitHub API" : `@${githubData?.login ?? GITHUB_USERNAME}`,
      live: true,
    },
    {
      icon: <Star className="h-5 w-5" />,
      value: githubData?.stars ?? 0,
      label: "Stars Earned",
      hint: unavailable ? "temporarily limited" : "across repositories",
      live: true,
    },
    {
      icon: <GitFork className="h-5 w-5" />,
      value: githubData?.forks ?? 0,
      label: "Forks",
      hint: unavailable ? "try refresh" : "community usage",
      live: true,
    },
    {
      icon: <Github className="h-5 w-5" />,
      value: githubData?.followers ?? 0,
      label: "Followers",
      hint: unavailable ? "rate-limited" : githubData?.cached ? "cached" : "synced now",
      live: true,
    },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {cells.map((cell) => (
          <StatCell
            key={cell.label}
            {...cell}
            loading={loading}
            unavailable={unavailable}
          />
        ))}
      </div>
      {unavailable && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/60 bg-muted/20 px-4 py-2.5 font-mono text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <AlertTriangle className="h-3.5 w-3.5 text-primary" />
            GitHub API is temporarily unavailable from this browser — counters
            will populate automatically once access recovers.
          </span>
          <button
            type="button"
            onClick={() => {
              setLoading(true);
              setRefreshCount((count) => count + 1);
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
  const [githubData, setGithubData] = React.useState<GithubData | null>(null);

  React.useEffect(() => {
    let isActive = true;
    loadGithubData().then((nextGithubData) => {
      if (isActive) setGithubData(nextGithubData);
    });

    return () => {
      isActive = false;
    };
  }, []);

  if (githubData?.error) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-2.5 py-1 font-mono text-xs text-muted-foreground",
          className
        )}
        title="GitHub API temporarily unavailable"
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
      title={`Stars: ${githubData?.stars ?? "…"} · Forks: ${githubData?.forks ?? "…"}`}
    >
      <Star className="h-3 w-3 text-primary" />
      <span className="tabular-nums">{githubData?.stars ?? "…"}</span>
      <GitFork className="ml-1 h-3 w-3 text-primary" />
      <span className="tabular-nums">{githubData?.forks ?? "…"}</span>
    </span>
  );
}
