import { NextResponse } from "next/server";

const USERNAME = "ParsaGg";
const TTL_MS = 10 * 60 * 1000; // 10 minutes

type CacheEntry = {
  at: number;
  data: {
    repos: number;
    stars: number;
    forks: number;
    followers: number;
    login: string | null;
    cached: boolean;
    fetchedAt: string;
  };
};

let cache: CacheEntry | null = null;

export async function GET() {
  const now = Date.now();

  if (cache && now - cache.at < TTL_MS) {
    return NextResponse.json({ ...cache.data, cached: true });
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        next: { revalidate: 600 },
      }
    );

    if (!res.ok) {
      // serve last good cache if present; otherwise return an error payload
      // (short-circuit — do NOT persist the error into the long-TTL cache)
      if (cache) {
        return NextResponse.json({ ...cache.data, cached: true });
      }
      return NextResponse.json(
        {
          repos: 0,
          stars: 0,
          forks: 0,
          followers: 0,
          login: USERNAME,
          cached: false,
          fetchedAt: new Date().toISOString(),
          error: res.status === 403 ? "rate_limited" : `github_${res.status}`,
        },
        { status: 200 }
      );
    }

    const repos: Array<{
      stargazers_count: number;
      forks_count: number;
      fork: boolean;
    }> = await res.json();

    let stars = 0;
    let forks = 0;
    let ownRepos = 0;
    for (const r of repos) {
      if (r.fork) continue;
      stars += r.stargazers_count || 0;
      forks += r.forks_count || 0;
      ownRepos += 1;
    }

    let followers = 0;
    let login: string | null = null;
    try {
      const u = await fetch(`https://api.github.com/users/${USERNAME}`, {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 600 },
      });
      if (u.ok) {
        const ud = await u.json();
        followers = ud.followers || 0;
        login = ud.login || USERNAME;
      }
    } catch {
      /* ignore profile errors */
    }

    const data: CacheEntry["data"] = {
      repos: ownRepos,
      stars,
      forks,
      followers,
      login,
      cached: false,
      fetchedAt: new Date().toISOString(),
    };

    cache = { at: now, data };

    return NextResponse.json(data);
  } catch {
    if (cache) {
      return NextResponse.json({ ...cache.data, cached: true });
    }
    return NextResponse.json(
      {
        repos: 0,
        stars: 0,
        forks: 0,
        followers: 0,
        login: null,
        cached: false,
        fetchedAt: new Date().toISOString(),
        error: "fetch_failed",
      },
      { status: 200 }
    );
  }
}
