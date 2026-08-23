import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DetailPage from '../../detail-page';
import { openSourceProjects } from '../../open-source-data';

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
  const image = project.logo.startsWith('http') ? project.logo : `https://tandede.github.io${project.logo}`;
  return {
    title,
    description,
    alternates: { canonical: `/open-source/${project.slug}/` },
    openGraph: { title, description, url: `/open-source/${project.slug}/`, images: [{ url: image }], type: 'article' },
    twitter: { card: 'summary', title, description, images: [image] },
  };
}

export default async function OpenSourceDetail({ params }: PageProps) {
  const { slug } = await params;
  const index = openSourceProjects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();
  const project = openSourceProjects[index];
  const previous = openSourceProjects[index - 1];
  const next = openSourceProjects[index + 1];

  return <DetailPage
    category="OPEN SOURCE CONTRIBUTION"
    role={project.role}
    title={project.name}
    subtitle="Upstream Engineering Contribution"
    intro={project.function}
    logo={project.logo}
    accent={project.accent}
    highlight={project.highlight}
    externalHref={project.href}
    externalLabel="查看 GitHub 项目"
    backHref="/#opensource"
    backLabel="返回开源贡献"
    previous={previous ? { href: `/open-source/${previous.slug}/`, label: previous.name } : undefined}
    next={next ? { href: `/open-source/${next.slug}/`, label: next.name } : undefined}
    steps={[
      { icon: 'problem', label: '发现问题', title: '真实工程边界', copy: project.problem },
      { icon: 'reasoning', label: '定位根因', title: '从现象回到机制', copy: project.reasoning },
      { icon: 'solution', label: '设计方案', title: '在约束内完成修复', copy: project.solution },
      { icon: 'result', label: '工程结果', title: '可验证的改进', copy: project.impact },
    ]}
  />;
}
