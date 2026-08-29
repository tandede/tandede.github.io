'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties, MouseEvent } from 'react';
import { PiArrowRightBold, PiStarFill } from 'react-icons/pi';
import { openSourceCardSummaries } from './open-source-card-summaries';
import type { OpenSourceCardSummary } from './open-source-card-summaries';
import { getGitHubStarsCacheKey, githubStarsCacheDuration } from './github-stars-cache';
import type { OpenSourceProject } from './open-source-data';

function formatStars(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(value >= 10_000_000 ? 0 : 1)}m`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(value >= 100_000 ? 0 : 1)}k`;
  return value.toLocaleString('en-US');
}

const storyTabs = [
  { key: 'problem', label: '发现问题' },
  { key: 'reasoning', label: '问题思考' },
  { key: 'solution', label: '解决方法' },
] as const;

type StoryTabKey = (typeof storyTabs)[number]['key'];

function OpenSourceStory({ slug, summary }: { slug: string; summary: OpenSourceCardSummary }) {
  const [activeTab, setActiveTab] = useState<StoryTabKey>('problem');
  const [lockedTab, setLockedTab] = useState<StoryTabKey | null>(null);

  const selectTab = (key: StoryTabKey) => {
    setActiveTab(key);
    setLockedTab((current) => current === key ? null : key);
  };

  return <div className="opensource-story-switcher" onMouseLeave={(event) => {
    if (lockedTab) return;
    setActiveTab('problem');

    const focusedElement = document.activeElement;
    if (focusedElement instanceof HTMLElement && event.currentTarget.contains(focusedElement)) {
      focusedElement.blur();
    }
  }}>
    <div className="opensource-story-tabs" role="tablist" aria-label="贡献摘要切换">
      {storyTabs.map((tab, index) => <button
        id={`${slug}-${tab.key}-tab`}
        className={activeTab === tab.key ? 'is-active' : undefined}
        type="button"
        role="tab"
        aria-selected={activeTab === tab.key}
        aria-controls={`${slug}-story-panel`}
        tabIndex={activeTab === tab.key ? 0 : -1}
        key={tab.key}
        onMouseEnter={() => {
          if (!lockedTab) setActiveTab(tab.key);
        }}
        onFocus={() => setActiveTab(tab.key)}
        onClick={() => selectTab(tab.key)}
        onKeyDown={(event) => {
          if (!['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'].includes(event.key)) return;
          event.preventDefault();
          const direction = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1;
          const nextIndex = (index + direction + storyTabs.length) % storyTabs.length;
          const nextKey = storyTabs[nextIndex].key;
          setActiveTab(nextKey);
          if (lockedTab) setLockedTab(nextKey);
          document.getElementById(`${slug}-${nextKey}-tab`)?.focus();
        }}
      >
        <span>0{index + 1}</span>
        <strong>{tab.label}</strong>
      </button>)}
    </div>
    <div
      id={`${slug}-story-panel`}
      className="opensource-story-panel"
      role="tabpanel"
      aria-labelledby={`${slug}-${activeTab}-tab`}
      key={activeTab}
    >
      <span>{storyTabs.find((tab) => tab.key === activeTab)?.label}</span>
      <p>{summary[activeTab]}</p>
      <small>{lockedTab === activeTab ? '已固定 · 再点一次解除' : '悬停预览 · 点击固定'}</small>
    </div>
  </div>;
}

function OpenSourceCard({ item, count }: { item: OpenSourceProject; count?: number }) {
  const starsLabel = typeof count === 'number' ? `${formatStars(count)} Stars` : 'Stars';
  const releaseCardFocus = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.blur();
  };
  const summary = openSourceCardSummaries[item.slug] ?? {
    problem: item.problem,
    reasoning: item.reasoning,
    solution: item.solution,
  };

  return <article className="opensource-card" data-glow style={{ '--repo-accent': item.accent } as CSSProperties}>
    <div className="opensource-face opensource-front">
      <div className="opensource-card-top">
        <div className="opensource-identity">
          {item.logo && <img src={item.logo} alt="" />}
          <div>
            <h3>{item.name}</h3>
            <div className="opensource-meta"><span className="repo-stars" title={typeof count === 'number' ? `${count.toLocaleString('en-US')} GitHub Stars` : '正在获取 GitHub Star'}><PiStarFill aria-hidden="true" />{starsLabel}</span>{item.release && <span className="opensource-release">{item.release.label}</span>}{item.role !== 'CONTRIBUTOR' && <span className="opensource-role">{item.role}</span>}</div>
          </div>
        </div>
      </div>
      <div className="opensource-project">
        <p>{item.function}</p>
      </div>
      <a className="opensource-card-link" href={`/open-source/${item.slug}/`} target="_blank" rel="noopener noreferrer" aria-label={`在新标签页查看 ${item.name} 开源贡献详情`} onClick={releaseCardFocus}><span>查看我的贡献</span><PiArrowRightBold aria-hidden="true" /></a>
    </div>
    <div className="opensource-face opensource-back">
      <div className="opensource-back-head"><strong>{item.name}</strong><span>{item.role}</span></div>
      <OpenSourceStory slug={item.slug} summary={summary} />
      <a className="opensource-card-link" href={`/open-source/${item.slug}/`} target="_blank" rel="noopener noreferrer" onClick={releaseCardFocus}><span>查看完整贡献</span><PiArrowRightBold aria-hidden="true" /></a>
    </div>
  </article>;
}

export default function OpenSourceGrid({ items }: { items: OpenSourceProject[] }) {
  const [stars, setStars] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let frame = 0;

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

  return <div className="opensource-grid" data-reveal data-motion>{orderedItems.map(({ item }) => <OpenSourceCard item={item} count={stars?.[item.href]} key={item.name} />)}</div>;
}
