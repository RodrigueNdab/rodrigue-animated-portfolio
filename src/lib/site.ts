import { profile } from '@/content/profile';

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, '');

export const site = {
  name: profile.name,
  qualifications: profile.qualifications,
  email: profile.email,
  location: profile.location,
  tagline: profile.intro,
  title: 'Rodrigue Ndabashinze | Evidence Synthesis, Causal Inference & AI',
  description: `${profile.name}, ${profile.qualifications}. ${profile.intro}`,
  /** Canonical base URL; set NEXT_PUBLIC_SITE_URL for a real deployment. Falls back to localhost so previews never point at another domain. */
  url: configuredUrl || 'http://localhost:3000',
  urlConfigured: Boolean(configuredUrl),
} as const;

export const socialList: Array<{ label: string; href: string }> = profile.links.map(
  ({ label, href }) => ({ label, href }),
);

export const navLinks: ReadonlyArray<{ name: string; href: string; menuOnly?: boolean }> = [
  { name: 'Home', href: '/#top', menuOnly: true },
  { name: 'About', href: '/#about' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Research', href: '/#research' },
  { name: 'Publications', href: '/#publications' },
  { name: 'Talks', href: '/#talks' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Awards', href: '/#awards' },
  { name: 'Contact', href: '/#contact' },
];
