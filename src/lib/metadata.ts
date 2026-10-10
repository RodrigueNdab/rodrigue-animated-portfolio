import { Metadata } from 'next';
import { site } from '@/lib/site';

export const siteMetadata: Metadata = {
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    site.name,
    'Evidence synthesis',
    'Causal inference',
    'Meta-analysis',
    'Clinical trial registries',
    'Biomedical NLP',
    'Epidemiology',
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  metadataBase: new URL(site.url),
  alternates: {
    canonical: './',
  },
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: site.title,
    description: site.description,
  },
  robots: site.urlConfigured ? { index: true, follow: true } : { index: false, follow: false },
};
