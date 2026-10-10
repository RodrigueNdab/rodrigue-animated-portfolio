'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import type { TalkPhoto } from '@/content/types';

export default function TalkGallery({ photos, label }: { photos: TalkPhoto[]; label: string }) {
  const [index, setIndex] = useState(0);
  const count = photos.length;
  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);
  const current = photos[index];

  return (
    <figure
      role="group"
      aria-roledescription="carousel"
      aria-label={`${label} photographs`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(-1);
        if (e.key === 'ArrowRight') go(1);
      }}
      className="mt-4"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-charcoal/5">
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          sizes="(min-width: 1024px) 40rem, 90vw"
          className="object-cover animate-[fadeIn_0.4s_ease]"
        />
      </div>
      <figcaption className="mt-2 flex items-center justify-between gap-4 text-sm text-warm">
        <span aria-live="polite">{current.caption ?? ''}</span>
        {count > 1 && (
          <span className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photograph"
              className="rounded-full border border-border px-3 py-1"
            >
              ←
            </button>
            <span aria-hidden="true">
              {index + 1} / {count}
            </span>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photograph"
              className="rounded-full border border-border px-3 py-1"
            >
              →
            </button>
          </span>
        )}
      </figcaption>
    </figure>
  );
}
