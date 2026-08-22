'use client';

import { useEffect, useState } from 'react';
import { PiStarFill } from 'react-icons/pi';

const cacheDuration = 30 * 60 * 1000;

function formatStars(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(value >= 10_000_000 ? 0 : 1)}m`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(value >= 100_000 ? 0 : 1)}k`;
  return value.toLocaleString('en-US');
}

export default function GitHubStars({ href }: { href: string }) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let frame = 0;
    const repository = new URL(href).pathname.replace(/^\//, '').replace(/\/$/, '');
    const cacheKey = `github-stars:${repository}`;

    const loadStars = async () => {
      try {
        const cached = window.localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached) as { value: number; updatedAt: number };
          if (typeof parsed.value === 'number' && Date.now() - parsed.updatedAt < cacheDuration) {
            frame = window.requestAnimationFrame(() => setStars(parsed.value));
            return;
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
        // Star counts are supplementary; project links remain usable if GitHub is unavailable.
      }
    };

    void loadStars();
    return () => {
      controller.abort();
      window.cancelAnimationFrame(frame);
    };
  }, [href]);

  return <span className="repo-stars" title={stars === null ? '正在获取 GitHub Star' : `${stars.toLocaleString('en-US')} GitHub Stars`}><PiStarFill aria-hidden="true" />{stars === null ? 'Stars' : `${formatStars(stars)} Stars`}</span>;
}
