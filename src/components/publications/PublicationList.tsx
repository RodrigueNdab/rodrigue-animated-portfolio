'use client';

import React, { useMemo, useState } from 'react';
import { Link } from 'next-transition-router';
import { rememberHomeScroll } from '@/lib/navigation';
import type { PublicationRecord, PublicationType } from '@/content/types';

interface PublicationListProps {
  items: PublicationRecord[];
  tone: 'dark' | 'light';
  showFilters?: boolean;
}

export default function PublicationList({
  items,
  tone,
  showFilters = false,
}: PublicationListProps) {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('all');
  const [type, setType] = useState<'all' | PublicationType>('all');
  const dark = tone === 'dark';

  const years = useMemo(
    () => Array.from(new Set(items.map((p) => p.year))).sort((a, b) => b - a),
    [items],
  );
  const types = useMemo(() => Array.from(new Set(items.map((p) => p.type))), [items]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (p) =>
        (!q || p.title.toLowerCase().includes(q)) &&
        (year === 'all' || String(p.year) === year) &&
        (type === 'all' || p.type === type),
    );
  }, [items, query, year, type]);

  const fieldClass = `w-full rounded-xl border px-4 py-2.5 text-sm sm:text-base ${
    dark ? 'bg-surface border-border-subtle text-cream' : 'bg-white/70 border-border text-charcoal'
  }`;
  const labelClass = `block text-xs font-mono uppercase tracking-widest mb-1.5 ${
    dark ? 'text-gray-soft' : 'text-warm'
  }`;

  return (
    <div>
      {showFilters && (
        <form
          role="search"
          aria-label="Filter publications"
          onSubmit={(e) => e.preventDefault()}
          className="grid gap-4 sm:grid-cols-[2fr_1fr_1fr] mb-8"
        >
          <div>
            <label htmlFor="pub-search" className={labelClass}>
              Search titles
            </label>
            <input
              id="pub-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="pub-year" className={labelClass}>
              Year
            </label>
            <select
              id="pub-year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className={fieldClass}
            >
              <option value="all">All years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pub-type" className={labelClass}>
              Type
            </label>
            <select
              id="pub-type"
              value={type}
              onChange={(e) => setType(e.target.value as 'all' | PublicationType)}
              className={fieldClass}
            >
              <option value="all">All types</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </form>
      )}

      <p
        role="status"
        aria-live="polite"
        className={`text-sm mb-4 ${dark ? 'text-gray-soft' : 'text-warm'} ${showFilters ? '' : 'sr-only'}`}
      >
        {visible.length === 1 ? '1 publication' : `${visible.length} publications`}
      </p>

      {visible.length === 0 ? (
        <p className={dark ? 'text-gray-soft' : 'text-warm'}>
          No publications match the current filters.
        </p>
      ) : (
        <ul className={`divide-y ${dark ? 'divide-border-subtle' : 'divide-border'}`}>
          {visible.map((pub) => (
            <li key={pub.id}>
              <article className="py-6 grid gap-2 md:grid-cols-[6rem_1fr] md:gap-8">
                <p
                  className={`font-mono text-sm tracking-widest ${dark ? 'text-gray-soft' : 'text-warm'}`}
                >
                  {pub.year}
                </p>
                <div>
                  <h3
                    className={`font-display text-lg sm:text-xl font-bold leading-snug ${
                      dark ? 'text-cream' : 'text-charcoal'
                    }`}
                  >
                    <Link
                      href={`/publication/${pub.slug}/`}
                      onClick={rememberHomeScroll}
                      className={`underline-offset-4 decoration-transparent underline transition-colors duration-300 ${
                        dark ? 'hover:decoration-accent' : 'hover:decoration-[#047857]'
                      }`}
                    >
                      {pub.title}
                    </Link>
                  </h3>
                  <p className={`mt-1 text-base ${dark ? 'text-light/80' : 'text-warm'}`}>
                    <em>{pub.venue}</em>
                    {pub.type === 'Preprint' && (
                      <span
                        className={`ml-3 inline-block rounded-full border px-2.5 py-0.5 text-xs font-mono uppercase tracking-widest not-italic ${
                          dark ? 'border-accent text-accent' : 'border-[#047857] text-[#047857]'
                        }`}
                      >
                        Preprint
                      </span>
                    )}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
