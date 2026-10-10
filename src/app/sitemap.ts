import type { MetadataRoute } from 'next';
import { publications } from '@/content/publications';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const publicationPages = publications.map((p) => ({
    url: `${site.url}/publication/${p.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${site.url}/publication/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...publicationPages,
  ];
}
