import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DetailPage from '../../detail-page';
import GitHubStars from '../../github-project-stats';
import OpenSourceContribution from '../../open-source-contribution';
import { openSourceProjects } from '../../open-source-data';
import OpenSourcePagination from '../../open-source-pagination';
import { RepositoryBadge, RepositoryBanner, RepositoryShowcase, RepositoryTags } from '../../repository-identity';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return openSourceProjects.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = openSourceProjects.find((item) => item.slug === slug);
  if (!project) return {};
  const title = `${project.name} 开源贡献｜ZHEWEN TAN`;
  const description = `${project.function} ${project.solution}`;
  const image = project.logo ? (project.logo.startsWith('http') ? project.logo : `https://tandede.github.io${project.logo}`) : null;
  return {
    title,
    description,
    alternates: { canonical: `/open-source/${project.slug}/` },
    openGraph: { title, description, url: `/open-source/${project.slug}/`, images: image ? [{ url: image }] : [], type: 'article' },
    twitter: { card: 'summary', title, description, images: image ? [image] : [] },
  };
}

export default async function OpenSourceDetail({ params }: PageProps) {
  const { slug } = await params;
  const index = openSourceProjects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const project = openSourceProjects[index];

  return <DetailPage
    title={project.name}
    intro={project.function}
    logo={project.logo}
    accent={project.accent}
    highlight={project.highlight}
    takeaway={project.takeaway}
    externalHref={project.href}
    externalLabel="查看 GitHub 项目"
    backHref="/#opensource"
    backLabel="返回开源贡献"
    pagination={<OpenSourcePagination items={openSourceProjects} currentSlug={project.slug} />}
    titleAddon={<><GitHubStars repositoryUrl={project.href} /><RepositoryBadge project={project} /></>}
    topVisual={<RepositoryBanner project={project} />}
    heroMeta={<RepositoryTags project={project} />}
    secondaryExternal={{ href: project.prHref, label: '查看我的 PR' }}
    contentHref="#contribution"
    contentLabel="查看贡献详情"
    showcase={<>
      <OpenSourceContribution project={project} />
      <RepositoryShowcase project={project} />
    </>}
  />;
}
