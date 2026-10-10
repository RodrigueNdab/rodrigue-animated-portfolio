import React from 'react';
import AnimatedHeading, { HeadingWord } from '@/components/ui/AnimateHeading';

interface SectionShellProps {
  id: string;
  label: string;
  words: HeadingWord[];
  tone: 'dark' | 'light';
  intro?: React.ReactNode;
  children: React.ReactNode;
}

export default function SectionShell({
  id,
  label,
  words,
  tone,
  intro,
  children,
}: SectionShellProps) {
  const dark = tone === 'dark';
  return (
    <section
      id={id}
      aria-label={label}
      className={`relative px-6 sm:px-8 md:px-12 lg:px-16 py-16 md:py-24 ${
        dark ? 'text-light' : 'text-charcoal'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full">
        <AnimatedHeading
          words={words}
          className={`text-[clamp(2.25rem,6.5vw,5.5rem)] ${dark ? 'text-light' : 'text-charcoal'}`}
          containerClassName="mb-6"
        />
        {intro && (
          <p
            className={`max-w-2xl mb-10 text-base sm:text-lg leading-relaxed ${dark ? 'text-gray-soft' : 'text-warm'}`}
          >
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
