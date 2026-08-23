'use client';

import { useEffect, useState } from 'react';
import { PiArrowUpRightBold, PiGitPullRequest, PiStarFill } from 'react-icons/pi';

const cacheDuration = 30 * 60 * 1000;

function formatStars(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(value >= 10_000_000 ? 0 : 1)}m`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(value >= 100_000 ? 0 : 1)}k`;
  return value.toLocaleString('en-US');
}

export default function GitHubProjectStats({ repositoryUrl, prUrl }: { repositoryUrl: string; prUrl: string }) {
  const [stars, setStars] = useState<number | null>(null);
  const repository = new URL(repositoryUrl).pathname.replace(/^\//, '').replace(/\/$/, '');
  const prNumber = new URL(prUrl).pathname.split('/').filter(Boolean).at(-1);

  useEffect(() => {
    const controller = new AbortController();
    const cacheKey = `github-stars:${repository}`;

    const load = async () => {
      try {
        const cached = window.localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached) as { value: number; updatedAt: number };
          if (typeof parsed.value === 'number') {
            setStars(parsed.value);
            if (Date.now() - parsed.updatedAt < cacheDuration) return;
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

  return <section className="github-detail-stats" aria-label="GitHub 项目信息">
    <div><PiStarFill aria-hidden="true" /><span>GitHub Stars</span><strong title={stars ? `${stars.toLocaleString('en-US')} Stars` : undefined}>{stars === null ? '—' : formatStars(stars)}</strong><small>每 30 分钟更新</small></div>
    <a href={prUrl} target="_blank" rel="noopener noreferrer"><PiGitPullRequest aria-hidden="true" /><span>我的 Pull Request</span><strong>#{prNumber} · MERGED</strong><small>查看上游合并记录 <PiArrowUpRightBold aria-hidden="true" /></small></a>
  </section>;
}
