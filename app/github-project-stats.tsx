'use client';

import { useEffect, useState } from 'react';
import { PiStarFill } from 'react-icons/pi';
import { getGitHubStarsCacheKey, githubStarsCacheDuration } from './github-stars-cache';

function formatStars(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(value >= 10_000_000 ? 0 : 1)}m`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(value >= 100_000 ? 0 : 1)}k`;
  return value.toLocaleString('en-US');
}

export default function GitHubStars({ repositoryUrl }: { repositoryUrl: string }) {
  const [stars, setStars] = useState<number | null>(null);
  const repository = new URL(repositoryUrl).pathname.replace(/^\//, '').replace(/\/$/, '');

  useEffect(() => {
    const controller = new AbortController();
    const cacheKey = getGitHubStarsCacheKey(repository);

    const load = async () => {
      try {
        const cached = window.localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached) as { value: number; updatedAt: number };
          if (typeof parsed.value === 'number') {
            setStars(parsed.value);
            if (Date.now() - parsed.updatedAt < githubStarsCacheDuration) return;
          }
        }
        const response = await fetch(`https://api.github.com/repos/${repository}`, {
          headers: { Accept: 'application/vnd.github+json' },
          signal: controller.signal,
        });
        if (!response.ok) return;
        const data = await response.json() as { stargazers_count?: number };
        if (typeof data.stargazers_count !== 'number') return;
        window.localStorage.setItem(cacheKey, JSON.stringify({ value: data.stargazers_count, updatedAt: Date.now() }));
        setStars(data.stargazers_count);
      } catch {
        // Keep the cached value or the loading fallback when GitHub rate-limits the request.
      }
    };

    void load();
    return () => controller.abort();
  }, [repository]);

  return <span className="detail-title-stars" title={stars === null ? '正在获取 GitHub Stars' : `${stars.toLocaleString('en-US')} GitHub Stars`}><PiStarFill aria-hidden="true" /><strong>{stars === null ? '—' : formatStars(stars)}</strong><small>Stars</small></span>;
}
