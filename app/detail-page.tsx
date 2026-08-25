import type { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
import {
  PiArrowDownBold,
  PiArrowLeftBold,
  PiArrowRightBold,
  PiArrowUpRightBold,
  PiCheckCircle,
  PiGithubLogo,
  PiGitPullRequest,
  PiLightbulb,
  PiMagnifyingGlass,
  PiWrench,
} from 'react-icons/pi';

export type DetailStep = {
  label: string;
  title: string;
  copy: string;
  icon: 'problem' | 'reasoning' | 'solution' | 'result';
};

type DetailPageProps = {
  category?: string;
  title: string;
  subtitle?: string;
  intro: string;
  accent: string;
  highlight: string;
  externalHref: string;
  externalLabel: string;
  backHref: string;
  backLabel: string;
  logo?: string;
  role?: string;
  metrics?: Array<[string, string]>;
  steps?: DetailStep[];
  previous?: { href: string; label: string };
  next?: { href: string; label: string };
  externalIcon?: ReactNode;
  showcase?: ReactNode;
  titleAddon?: ReactNode;
  secondaryExternal?: { href: string; label: string; icon?: ReactNode };
  contentHref?: string;
  contentLabel?: string;
  heroAside?: ReactNode;
  pageClassName?: string;
  pagination?: ReactNode;
  topVisual?: ReactNode;
  heroMeta?: ReactNode;
};

const stepIcons = {
  problem: PiMagnifyingGlass,
  reasoning: PiLightbulb,
  solution: PiWrench,
  result: PiCheckCircle,
};

export default function DetailPage({
  category,
  title,
  subtitle,
  intro,
  accent,
  highlight,
  externalHref,
  externalLabel,
  backHref,
  backLabel,
  logo,
  role,
  metrics,
  steps,
  previous,
  next,
  externalIcon,
  showcase,
  titleAddon,
  secondaryExternal,
  contentHref = '#story',
  contentLabel = '查看完整思路',
  heroAside,
  pageClassName = '',
  pagination,
  topVisual,
  heroMeta,
}: DetailPageProps) {
  const homeSectionLabel = backLabel.replace(/^返回/, '');

  return <main className={`detail-page ${pageClassName}`} style={{ '--detail-accent': accent } as CSSProperties}>
    <nav className="detail-nav" aria-label="详情页导航">
      <a className="detail-back" href={backHref}><PiArrowLeftBold aria-hidden="true" />{backLabel}</a>
      <Link className="detail-brand" href="/">ZHEWEN TAN</Link>
      <a className="detail-external-mini" href={externalHref} target="_blank" rel="noopener noreferrer">{externalLabel}<PiArrowUpRightBold aria-hidden="true" /></a>
    </nav>

    {topVisual}

    <section className="detail-hero">
      <div className="detail-hero-main">
        {category && <p className="detail-kicker">{category}{role ? ` · ${role}` : ''}</p>}
        <div className="detail-title-row">
          {logo && <span className="detail-logo"><img src={logo} alt="" /></span>}
          <div>{subtitle && <small>{subtitle}</small>}<div className="detail-heading-line"><h1>{title}</h1>{titleAddon}</div></div>
        </div>
        <p className="detail-intro">{intro}</p>
        {heroMeta}
        <div className="detail-actions">
          <a href={contentHref}>{contentLabel} <PiArrowDownBold aria-hidden="true" /></a>
          <a href={externalHref} target="_blank" rel="noopener noreferrer">{externalIcon ?? <PiGithubLogo aria-hidden="true" />}{externalLabel}<PiArrowUpRightBold aria-hidden="true" /></a>
          {secondaryExternal && <a href={secondaryExternal.href} target="_blank" rel="noopener noreferrer">{secondaryExternal.icon ?? <PiGitPullRequest aria-hidden="true" />}{secondaryExternal.label}<PiArrowUpRightBold aria-hidden="true" /></a>}
        </div>
      </div>
      {heroAside ?? <aside className="detail-highlight" data-glow data-motion><small>KEY TAKEAWAY</small><strong>{highlight}</strong></aside>}
    </section>

    {metrics && metrics.length > 0 && <section className="detail-metrics" aria-label="项目指标" data-motion>
      {metrics.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
    </section>}

    {steps && <section className="detail-story" id="story" data-motion>
      <header><span>ENGINEERING STORY</span><h2>从问题到结果</h2><p>按真实工作顺序展开，而不是只展示一个最终结论。</p></header>
      <div className="detail-flow">
        {steps.map((step, index) => {
          const Icon = stepIcons[step.icon];
          return <div className="detail-flow-item" key={step.label}>
            <article className="detail-step" data-glow>
              <div className="detail-step-top"><span>{String(index + 1).padStart(2, '0')}</span><Icon aria-hidden="true" /></div>
              <small>{step.label}</small>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
            {index < steps.length - 1 && <span className="detail-connector" aria-hidden="true"><PiArrowRightBold /></span>}
          </div>;
        })}
      </div>
    </section>}

    {showcase}

    {pagination ?? <nav className="detail-pagination" aria-label="详情页切换">
      {previous
        ? <a href={previous.href} data-glow><PiArrowLeftBold aria-hidden="true" /><span><small>上一个</small>{previous.label}</span></a>
        : <a href={backHref} data-glow><PiArrowLeftBold aria-hidden="true" /><span><small>返回首页</small>{homeSectionLabel}</span></a>}
      {next
        ? <a href={next.href} data-glow><span><small>下一个</small>{next.label}</span><PiArrowRightBold aria-hidden="true" /></a>
        : <a href={backHref} data-glow><span><small>返回首页</small>{homeSectionLabel}</span><PiArrowRightBold aria-hidden="true" /></a>}
    </nav>}
  </main>;
}
