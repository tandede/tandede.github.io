import type { MetadataRoute } from 'next';
import { openSourceProjects } from './open-source-data';
import { featuredProjects } from './project-data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const detailPages: MetadataRoute.Sitemap = [
    ...featuredProjects.map((project) => ({
      url: `https://tandede.github.io/projects/${project.slug}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...openSourceProjects.map((project) => ({
      url: `https://tandede.github.io/open-source/${project.slug}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  return [
    {
      url: 'https://tandede.github.io/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...detailPages,
  ];
}
