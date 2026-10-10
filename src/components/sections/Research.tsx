'use client';

import Reveal from '@/components/ui/Reveal';
import SectionShell from '@/components/ui/SectionShell';
import { Link } from 'next-transition-router';
import { publications } from '@/content/publications';
import { research } from '@/content/research';
import { talks } from '@/content/talks';
import { rememberHomeScroll, useHandleLinkClick } from '@/lib/navigation';

const linkClass =
  'underline decoration-[#047857]/40 underline-offset-4 hover:decoration-[#047857] text-charcoal';

const Research = () => {
  const handleLinkClick = useHandleLinkClick();

  return (
    <SectionShell
      id="research"
      label="Research"
      tone="light"
      words={[{ t: 'RESEARCH' }, { t: 'themes', serif: true }]}
    >
      <Reveal as="ul" className="grid gap-6 md:grid-cols-2">
        {research.map((theme) => {
          const relatedPublications = (theme.publicationIds ?? [])
            .map((id) => publications.find((p) => p.id === id))
            .filter((p): p is (typeof publications)[number] => Boolean(p));
          const relatedTalks = (theme.talkIds ?? [])
            .map((id) => talks.find((t) => t.id === id))
            .filter((t): t is (typeof talks)[number] => Boolean(t));

          return (
            <li
              key={theme.id}
              data-reveal
              className="rounded-3xl border border-border bg-white/50 p-6 sm:p-8 transition-shadow duration-300 hover:shadow-lg"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-[#047857] mb-3">
                Research theme
              </p>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-charcoal mb-3">
                {theme.title}
              </h3>
              <p className="text-warm text-base leading-relaxed">{theme.summary}</p>

              {(relatedPublications.length > 0 || relatedTalks.length > 0) && (
                <div className="mt-5 space-y-3 text-sm">
                  {relatedPublications.length > 0 && (
                    <div>
                      <p className="font-mono text-xs uppercase tracking-widest text-warm mb-1">
                        Related publications
                      </p>
                      <ul className="space-y-1">
                        {relatedPublications.map((p) => (
                          <li key={p.id}>
                            <Link
                              href={`/publication/${p.slug}/`}
                              onClick={rememberHomeScroll}
                              className={linkClass}
                            >
                              {p.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {relatedTalks.length > 0 && (
                    <div>
                      <p className="font-mono text-xs uppercase tracking-widest text-warm mb-1">
                        Related talks
                      </p>
                      <ul className="space-y-1">
                        {relatedTalks.map((t) => (
                          <li key={t.id}>
                            <a
                              href={`/#talk-${t.id}`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleLinkClick(`/#talk-${t.id}`);
                              }}
                              className={linkClass}
                            >
                              {t.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </Reveal>
    </SectionShell>
  );
};

export default Research;
