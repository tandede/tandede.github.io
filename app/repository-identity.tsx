import { PiArrowUpRightBold, PiSealCheckFill } from 'react-icons/pi';
import type { OpenSourceProject } from './open-source-data';
import { repositoryIdentities } from './repository-identity-data';

export default function RepositoryIdentity({ project }: { project: OpenSourceProject }) {
  const identity = repositoryIdentities[project.slug];
  if (!identity) return null;

  return <section className="repository-identity" aria-labelledby={`repository-${project.slug}`} data-motion>
    <header>
      <span>ABOUT THE REPOSITORY</span>
      <h2 id={`repository-${project.slug}`}>{project.name} 项目生态</h2>
      <p>{identity.summary}</p>
    </header>

    <div className={`repository-identity-stage repository-image-${identity.imageMode ?? 'cover'}`} data-glow>
      <div className="repository-identity-media">
        <img src={identity.image} alt={identity.imageAlt} style={{ objectPosition: identity.imagePosition }} />
        <div className="repository-identity-label">
          <span className="repository-mini-logo"><img src={project.logo} alt="" /></span>
          <span><small>UPSTREAM PROJECT</small><strong>{project.name}</strong></span>
        </div>
      </div>

      <div className="repository-identity-aside">
        <div className="repository-mark-list">
          {identity.marks.map((mark, index) => <article key={mark.label}>
            <span>{String(index + 1).padStart(2, '0')} · {mark.label}</span>
            <strong>{mark.value}</strong>
          </article>)}
        </div>

        {identity.badge && <a className="repository-award" href={identity.badge.href} target="_blank" rel="noopener noreferrer">
          <span><PiSealCheckFill aria-hidden="true" /> PROJECT MARK</span>
          <img src={identity.badge.image} alt={identity.badge.alt} />
          <small>{identity.badge.caption}</small>
          <PiArrowUpRightBold aria-hidden="true" />
        </a>}
      </div>
    </div>
  </section>;
}
