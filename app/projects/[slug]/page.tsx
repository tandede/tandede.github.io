import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PiFileText, PiGlobeHemisphereWest } from 'react-icons/pi';
import DetailPage from '../../detail-page';
import { featuredProjects } from '../../project-data';
import ProjectShowcase, { ProjectHeroAside } from '../../project-showcase';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return featuredProjects.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = featuredProjects.find((item) => item.slug === slug);
  if (!project) return {};
  const title = `${project.title}｜代表项目｜ZHEWEN TAN`;
  const description = project.intro;
  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.slug}/` },
    openGraph: { title, description, url: `/projects/${project.slug}/`, images: [], type: 'article' },
    twitter: { card: 'summary', title, description, images: [] },
  };
}

export default async function ProjectDetail({ params }: PageProps) {
  const { slug } = await params;
  const index = featuredProjects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const project = featuredProjects[index];
  const previous = featuredProjects[index - 1];
  const next = featuredProjects[index + 1];

  return <DetailPage
    category="FEATURED PROJECT"
    title={project.title}
    subtitle={project.subtitle}
    intro={project.intro}
    accent={project.accent}
    highlight={project.highlight}
    externalHref={project.href}
    externalLabel="查看项目主页"
    externalIcon={<PiGlobeHemisphereWest aria-hidden="true" />}
    secondaryExternal={project.slug === 'tiny-r1-safety-8b' ? { href: project.paperHref, label: '查看论文', icon: <PiFileText aria-hidden="true" /> } : undefined}
    backHref="/#projects"
    backLabel="返回代表项目"
    contentHref="#project-showcase"
    contentLabel="进入项目"
    heroAside={<ProjectHeroAside slug={project.slug} />}
    pageClassName={`featured-detail featured-${project.slug}`}
    showcase={<ProjectShowcase project={project} />}
    previous={previous ? { href: `/projects/${previous.slug}/`, label: previous.title } : undefined}
    next={next ? { href: `/projects/${next.slug}/`, label: next.title } : undefined}
  />;
}
