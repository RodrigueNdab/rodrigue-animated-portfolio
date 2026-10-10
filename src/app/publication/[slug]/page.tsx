import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from 'next-transition-router';
import PublicationPageShell from '@/components/publications/PublicationPageShell';
import { publications } from '@/content/publications';
import { research } from '@/content/research';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return publications.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pub = publications.find((p) => p.slug === slug);
  if (!pub) return { title: 'Publication not found' };
  return {
    title: pub.title,
    description: `${pub.title} — ${pub.venue}, ${pub.year}${pub.type === 'Preprint' ? ' (preprint)' : ''}.`,
    alternates: { canonical: `/publication/${pub.slug}/` },
  };
}

export default async function PublicationPage({ params }: PageProps) {
  const { slug } = await params;
  const pub = publications.find((p) => p.slug === slug);
  if (!pub) notFound();

  const themes = research.filter((t) => t.publicationIds?.includes(pub.id));
  const doiUrl = pub.doi ? `https://doi.org/${pub.doi}` : undefined;

  return (
    <PublicationPageShell>
      <p className="font-mono text-xs uppercase tracking-widest text-gray-soft mb-6">
        <Link href="/publication/" className="hover:text-accent">
          ← All publications
        </Link>
      </p>
      <article>
        <header>
          <p className="font-mono text-sm uppercase tracking-widest text-accent mb-4">
            {pub.type === 'Preprint' ? 'Preprint' : 'Publication'} · {pub.year}
          </p>
          <h1 className="font-display text-[clamp(1.75rem,4.5vw,3.25rem)] font-black leading-tight tracking-tight text-cream">
            {pub.title}
          </h1>
        </header>

        <dl className="mt-8 grid gap-4 text-base sm:grid-cols-[9rem_1fr]">
          {pub.authors && pub.authors.length > 0 && (
            <>
              <dt className="font-mono text-xs uppercase tracking-widest text-gray-soft pt-1">
                Authors
              </dt>
              <dd>{pub.authors.join(', ')}</dd>
            </>
          )}
          <dt className="font-mono text-xs uppercase tracking-widest text-gray-soft pt-1">
            {pub.type === 'Preprint' ? 'Server' : 'Journal'}
          </dt>
          <dd>
            <em>{pub.venue}</em>
          </dd>
          <dt className="font-mono text-xs uppercase tracking-widest text-gray-soft pt-1">Year</dt>
          <dd>{pub.year}</dd>
          <dt className="font-mono text-xs uppercase tracking-widest text-gray-soft pt-1">Type</dt>
          <dd>{pub.type}</dd>
          {doiUrl && (
            <>
              <dt className="font-mono text-xs uppercase tracking-widest text-gray-soft pt-1">
                DOI
              </dt>
              <dd>
                <a
                  href={doiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-accent"
                >
                  {pub.doi}
                </a>
              </dd>
            </>
          )}
        </dl>

        {pub.abstract && (
          <section className="mt-10" aria-labelledby="abstract-heading">
            <h2 id="abstract-heading" className="font-display text-xl font-bold text-cream mb-3">
              Abstract
            </h2>
            <p className="leading-relaxed text-light/90">{pub.abstract}</p>
          </section>
        )}

        {pub.url && (
          <p className="mt-8">
            <a
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-accent px-5 py-2 text-accent hover:bg-accent/10"
            >
              View at publisher
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        )}

        {themes.length > 0 && (
          <section className="mt-12" aria-labelledby="related-heading">
            <h2 id="related-heading" className="font-display text-xl font-bold text-cream mb-3">
              Related research
            </h2>
            <ul className="space-y-1 text-light/90">
              {themes.map((t) => (
                <li key={t.id}>
                  <Link
                    href="/#research"
                    className="underline underline-offset-4 hover:text-accent"
                  >
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </PublicationPageShell>
  );
}
