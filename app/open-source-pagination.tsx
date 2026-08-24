'use client';

import { useEffect, useMemo, useState } from 'react';
import { PiArrowLeftBold, PiArrowRightBold } from 'react-icons/pi';
import { getGitHubStarsCacheKey, githubStarsCacheDuration } from './github-stars-cache';
import type { OpenSourceProject } from './open-source-data';

export default function OpenSourcePagination({ items, currentSlug }: { items: OpenSourceProject[]; currentSlug: string }) {
  const [stars, setStars] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadStars = async () => {
      const entries = await Promise.all(items.map(async (item) => {
        const repository = new URL(item.href).pathname.replace(/^\//, '').replace(/\/$/, '');
        const cacheKey = getGitHubStarsCacheKey(repository);
        let staleValue: number | null = null;

        try {
          const cached = window.localStorage.getItem(cacheKey);
          if (cached) {
            const parsed = JSON.parse(cached) as { value: number; updatedAt: number };
            if (typeof parsed.value === 'number') {
              staleValue = parsed.value;
              if (Date.now() - parsed.updatedAt < githubStarsCacheDuration) return [item.href, parsed.value] as const;
            }
          }

          const response = await fetch(`https://api.github.com/repos/${repository}`, {
            headers: { Accept: 'application/vnd.github+json' },
            signal: controller.signal,
          });
          if (!response.ok) return [item.href, staleValue] as const;
          const data = await response.json() as { stargazers_count?: number };
          if (typeof data.stargazers_count !== 'number') return [item.href, staleValue] as const;
          window.localStorage.setItem(cacheKey, JSON.stringify({ value: data.stargazers_count, updatedAt: Date.now() }));
          return [item.href, data.stargazers_count] as const;
        } catch {
          return [item.href, staleValue] as const;
        }
      }));

      if (controller.signal.aborted) return;
      setStars(Object.fromEntries(entries.filter((entry): entry is readonly [string, number] => typeof entry[1] === 'number')));
    };

    void loadStars();
    return () => controller.abort();
  }, [items]);

  const orderedItems = useMemo(() => items.map((item, originalIndex) => ({ item, originalIndex })).sort((left, right) => {
    if (!stars) return left.originalIndex - right.originalIndex;
    const difference = (stars[right.item.href] ?? -1) - (stars[left.item.href] ?? -1);
    return difference || left.originalIndex - right.originalIndex;
  }).map(({ item }) => item), [items, stars]);

  const currentIndex = orderedItems.findIndex((item) => item.slug === currentSlug);
  const previous = currentIndex > 0 ? orderedItems[currentIndex - 1] : undefined;
  const next = currentIndex >= 0 && currentIndex < orderedItems.length - 1 ? orderedItems[currentIndex + 1] : undefined;

  if (!stars) return <nav className="detail-pagination detail-pagination-loading" aria-label="正在同步开源贡献排序" aria-busy="true">
    <a href="/#opensource"><PiArrowLeftBold aria-hidden="true" /><span><small>返回首页</small>开源贡献</span></a>
    <span><small>正在同步</small>GitHub Star 排序</span>
  </nav>;

  return <nav className="detail-pagination" aria-label="按 GitHub Star 排序切换开源贡献">
    {previous
      ? <a href={`/open-source/${previous.slug}/`}><PiArrowLeftBold aria-hidden="true" /><span><small>上一个</small>{previous.name}</span></a>
      : <a href="/#opensource"><PiArrowLeftBold aria-hidden="true" /><span><small>返回首页</small>开源贡献</span></a>}
    {next
      ? <a href={`/open-source/${next.slug}/`}><span><small>下一个</small>{next.name}</span><PiArrowRightBold aria-hidden="true" /></a>
      : <a href="/#opensource"><span><small>返回首页</small>开源贡献</span><PiArrowRightBold aria-hidden="true" /></a>}
  </nav>;
}
