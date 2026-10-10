import type { Metadata } from 'next';
import { Link } from 'next-transition-router';
import PublicationList from '@/components/publications/PublicationList';
import PublicationPageShell from '@/components/publications/PublicationPageShell';
import { profile } from '@/content/profile';
import { publications } from '@/content/publications';

export const metadata: Metadata = {
  title: 'Publications',
  description: `Publications by ${profile.name}: search by title and filter by year or type.`,
  alternates: { canonical: '/publication/' },
};

export default function PublicationIndexPage() {
  const scholar = profile.links.find((l) => l.id === 'scholar');
  return (
    <PublicationPageShell>
      <p className="font-mono text-xs uppercase tracking-widest text-gray-soft mb-4">
        <Link href="/" className="hover:text-accent">
          ← {profile.name}
        </Link>
      </p>
      <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] font-black uppercase tracking-tighter leading-none text-cream mb-8">
        Publications
      </h1>
      <PublicationList items={publications} tone="dark" showFilters />
      {scholar && (
        <p className="mt-10 text-gray-soft">
          See also{' '}
          <a
            href={scholar.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-accent"
          >
            Google Scholar
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </p>
      )}
    </PublicationPageShell>
  );
}
