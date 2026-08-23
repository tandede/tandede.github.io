'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { PiArrowRightBold, PiStarFill } from 'react-icons/pi';
import type { OpenSourceProject } from './open-source-data';

const cacheDuration = 30 * 60 * 1000;

function formatStars(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(value >= 10_000_000 ? 0 : 1)}m`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(value >= 100_000 ? 0 : 1)}k`;
  return value.toLocaleString('en-US');
}

export default function OpenSourceGrid({ items }: { items: OpenSourceProject[] }) {
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

  return <div className="opensource-grid" data-reveal>{orderedItems.map(({ item }) => {
    const count = stars?.[item.href];
    const starsLabel = typeof count === 'number' ? `${formatStars(count)} Stars` : 'Stars';

    return <a className="opensource-card" href={`/open-source/${item.slug}/`} key={item.name} aria-label={`查看 ${item.name} 开源贡献详情`} style={{ '--repo-accent': item.accent } as CSSProperties}>
      <div className="opensource-front">
        <div className="opensource-card-top">
          <div className="opensource-identity">
            <img src={item.logo} alt="" />
            <div><h3>{item.name}</h3></div>
          </div>
          <span className="repo-stars" title={typeof count === 'number' ? `${count.toLocaleString('en-US')} GitHub Stars` : '正在获取 GitHub Star'}><PiStarFill aria-hidden="true" />{starsLabel}</span>
        </div>
        <div className="opensource-project">
          <p>{item.function}</p>
        </div>
        <div className="opensource-card-link"><span>查看贡献详情</span><PiArrowRightBold aria-hidden="true" /></div>
      </div>
    </a>;
  })}</div>;
}
