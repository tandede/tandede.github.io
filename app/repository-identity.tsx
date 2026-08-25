import { PiImageSquare } from 'react-icons/pi';
import type { OpenSourceProject } from './open-source-data';
import { repositoryVisuals } from './repository-identity-data';

export function RepositoryBadge({ project }: { project: OpenSourceProject }) {
  const badge = repositoryVisuals[project.slug]?.badge;
  if (!badge) return null;

  return <a className="detail-repository-badge" href={badge.href} target="_blank" rel="noopener noreferrer" title={badge.alt}>
    <img src={badge.image} alt={badge.alt} />
  </a>;
}

export function RepositoryTags({ project }: { project: OpenSourceProject }) {
  const tags = repositoryVisuals[project.slug]?.tags;
  if (!tags?.length) return null;

  return <div className="detail-repository-tags" aria-label="项目标签">
    {tags.map((tag) => <span key={tag}>{tag}</span>)}
  </div>;
}

export function RepositoryBanner({ project }: { project: OpenSourceProject }) {
  const banner = repositoryVisuals[project.slug]?.banner;
  if (!banner) return null;

  return <figure className={`repository-banner repository-media-${banner.mode ?? 'cover'}`}>
    <img src={banner.image} alt={banner.alt} />
  </figure>;
}

export function RepositoryShowcase({ project }: { project: OpenSourceProject }) {
  const showcase = repositoryVisuals[project.slug]?.showcase;
  if (!showcase) return null;

  return <figure className={`repository-showcase repository-media-${showcase.mode ?? 'cover'}`} data-motion data-glow>
    <div><img src={showcase.image} alt={showcase.alt} /></div>
    <figcaption><PiImageSquare aria-hidden="true" /><span><small>FROM THE README</small>{showcase.caption}</span></figcaption>
  </figure>;
}
