'use client';

import { useEffect, useMemo, useState } from 'react';
import { PiArrowUpRightBold, PiStarFill } from 'react-icons/pi';

type OpenSourceItem = {
  name: string;
  logo: string;
  href: string;
  function: string;
  contribution: string;
};

const cacheDuration = 30 * 60 * 1000;

function formatStars(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(value >= 10_000_000 ? 0 : 1)}m`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(value >= 100_000 ? 0 : 1)}k`;
  return value.toLocaleString('en-US');
}

export default function OpenSourceGrid({ items }: { items: OpenSourceItem[] }) {
  const [stars, setStars] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let frame = 0;

    const loadStars = async () => {
      const entries = await Promise.all(items.map(async (item) => {
        const repository = new URL(item.href).pathname.replace(/^\//, '').replace(/\/$/, '');
        const cacheKey = `github-stars:${repository}`;
        let staleValue: number | null = null;

        try {
          const cached = window.localStorage.getItem(cacheKey);
          if (cached) {
            const parsed = JSON.parse(cached) as { value: number; updatedAt: number };
            if (typeof parsed.value === 'number') {
              staleValue = parsed.value;
              if (Date.now() - parsed.updatedAt < cacheDuration) return [item.href, parsed.value] as const;
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
      const resolved = Object.fromEntries(entries.filter((entry): entry is readonly [string, number] => typeof entry[1] === 'number'));
      frame = window.requestAnimationFrame(() => setStars(resolved));
    };

    void loadStars();
    return () => {
      controller.abort();
      window.cancelAnimationFrame(frame);
    };
  }, [items]);

  const orderedItems = useMemo(() => items.map((item, originalIndex) => ({ item, originalIndex })).sort((left, right) => {
    if (!stars) return left.originalIndex - right.originalIndex;
    const difference = (stars[right.item.href] ?? -1) - (stars[left.item.href] ?? -1);
    return difference || left.originalIndex - right.originalIndex;
  }), [items, stars]);

  return <div className="opensource-grid" data-reveal>{orderedItems.map(({ item }, index) => {
    const count = stars?.[item.href];
    return <a className="opensource-row" href={item.href} key={item.name} target="_blank" rel="noopener noreferrer"><span>{String(index + 1).padStart(2, '0')}</span><img src={item.logo} alt="" /><div className="opensource-name"><h3>{item.name}</h3><small>Contributor</small><span className="repo-stars" title={typeof count === 'number' ? `${count.toLocaleString('en-US')} GitHub Stars` : '正在获取 GitHub Star'}><PiStarFill aria-hidden="true" />{typeof count === 'number' ? `${formatStars(count)} Stars` : 'Stars'}</span></div><p><strong>项目功能</strong>{item.function}</p><p><strong>我的贡献</strong>{item.contribution}</p><PiArrowUpRightBold aria-hidden="true" /></a>;
  })}</div>;
}
