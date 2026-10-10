'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger, SplitText, useGSAP } from '@/lib/gsap';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { EASE } from '@/lib/motion';
import { profile } from '@/content/profile';
import { scrollToSection } from '@/lib/navigation';
import { useReducedMotion } from '@/lib/useReducedMotion';

interface HomeBannerProps {
  portraitSrc?: string;
  cvHref?: string;
}

const HomeBanner = ({ portraitSrc, cvHref }: HomeBannerProps) => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const innerContentRef = useRef<HTMLDivElement>(null);
  const splitsRef = useRef<SplitText[]>([]);
  const hasPlayedRef = useRef(false);
  const reduced = useReducedMotion();

  const splitName = useCallback(() => {
    const lines = nameRef.current?.querySelectorAll<HTMLElement>('[data-hero-line]') ?? [];
    const chars: HTMLElement[] = [];
    splitsRef.current.forEach((s) => s.revert());
    splitsRef.current = [];
    lines.forEach((line) => {
      const split = SplitText.create(line, { type: 'chars', charsClass: 'hero-char' });
      splitsRef.current.push(split);
      chars.push(...(split.chars as HTMLElement[]));
    });
    return chars;
  }, []);

  const hideForIntro = useCallback((chars: HTMLElement[]) => {
    gsap.set(chars, {
      yPercent: 125,
      rotateX: -70,
      opacity: 0,
      transformPerspective: 900,
      transformOrigin: '50% 100%',
    });
    gsap.set(detailsRef.current, { y: 30, opacity: 0 });
    gsap.set(buttonsRef.current?.children ?? [], { y: 22, opacity: 0 });
    gsap.set(portraitRef.current, { scale: 0.96, opacity: 0 });
  }, []);

  const playIntro = useCallback(() => {
    if (reduced || !nameRef.current || hasPlayedRef.current) return;
    hasPlayedRef.current = true;

    const chars = splitName();
    hideForIntro(chars);

    const tl = gsap.timeline({ defaults: { ease: EASE.outQuart }, delay: 0.05 });
    tl.to(chars, {
      yPercent: 0,
      rotateX: 0,
      opacity: 1,
      duration: 1,
      stagger: { each: 0.026, from: 'start' },
    })
      .to(detailsRef.current, { y: 0, opacity: 1, duration: 0.75, ease: EASE.outCubic }, '-=0.55')
      .to(
        buttonsRef.current?.children ?? [],
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: EASE.outCubic },
        '-=0.45',
      )
      .to(portraitRef.current, { scale: 1, opacity: 1, duration: 1, ease: EASE.outCubic }, '-=1');
  }, [reduced, splitName, hideForIntro]);

  useEffect(() => {
    if (reduced || !nameRef.current) {
      if (reduced) {
        gsap.set(
          [detailsRef.current, portraitRef.current, ...(buttonsRef.current?.children ?? [])],
          { clearProps: 'all' },
        );
      }
      return;
    }
    if (typeof window !== 'undefined' && window.__preloaderDone === true) {
      playIntro();
      return;
    }
    hideForIntro(splitName());
  }, [reduced, playIntro, splitName, hideForIntro]);

  useEffect(() => {
    const handlePreloaderComplete = () => playIntro();
    window.addEventListener('preloaderComplete', handlePreloaderComplete);
    return () => window.removeEventListener('preloaderComplete', handlePreloaderComplete);
  }, [playIntro]);

  useGSAP(
    () => {
      if (reduced || !sectionRef.current || !innerContentRef.current) return;
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        animation: gsap.to(innerContentRef.current, { y: '-10vh', ease: 'none' }),
      });
      return () => trigger.kill();
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  const goTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(id);
  };

  const [firstName, ...rest] = profile.name.split(' ');
  const lastName = rest.join(' ');

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="Introduction"
      className="min-h-[100dvh] md:min-h-screen px-6 sm:px-8 md:px-12 lg:px-16 pt-28 pb-12 md:pt-24 bg-cream flex items-center relative overflow-hidden"
    >
      <div ref={innerContentRef} className="max-w-7xl mx-auto w-full relative z-10">
        <div
          className={`flex flex-col gap-10 ${
            portraitSrc
              ? 'lg:flex-row lg:items-center lg:justify-between'
              : 'items-center text-center'
          }`}
        >
          <div className={portraitSrc ? 'lg:max-w-[60%]' : 'w-full'}>
            <h1
              ref={nameRef}
              aria-label={profile.name}
              className="select-none leading-none mb-6 md:mb-8 text-charcoal"
            >
              <span aria-hidden="true" className="block">
                <span
                  data-hero-line
                  className="block font-display font-black uppercase tracking-tight text-[clamp(3rem,min(12.5vw,16vh),9rem)]"
                >
                  {firstName}
                </span>
                <span
                  data-hero-line
                  className={`serif-accent block text-[clamp(2.75rem,min(11vw,14vh),7.5rem)] leading-[0.9] ${
                    portraitSrc ? '' : 'md:ml-[10vw]'
                  }`}
                >
                  {lastName.toLowerCase()}
                </span>
              </span>
            </h1>

            <div ref={detailsRef} className={`max-w-2xl ${portraitSrc ? '' : 'mx-auto'}`}>
              <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#047857] mb-2">
                {profile.qualifications}
              </p>
              <p className="font-sans text-lg sm:text-xl text-charcoal font-medium">
                {profile.role}
              </p>
              <p className="font-sans text-base sm:text-lg text-warm mb-6">
                {profile.institution} · {profile.unit}
              </p>
              <p className="font-sans text-base sm:text-lg md:text-xl leading-relaxed text-warm mb-8 md:mb-10">
                {profile.intro}
              </p>
            </div>

            <div
              ref={buttonsRef}
              className={`flex flex-row items-center gap-2.5 sm:gap-4 flex-wrap ${
                portraitSrc ? '' : 'justify-center'
              }`}
            >
              <AnimatedButton
                as="a"
                href="/#publications"
                onClick={goTo('publications')}
                topText="PUBLICATIONS"
                bottomText="VIEW LIST →"
                variant="primary"
              />
              <AnimatedButton
                as="a"
                href="/#contact"
                onClick={goTo('contact')}
                topText="CONTACT"
                bottomText="GET IN TOUCH →"
                variant="light"
              />
              {cvHref && (
                <AnimatedButton
                  as="a"
                  href={cvHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  topText="CV"
                  bottomText="DOWNLOAD →"
                  variant="outline"
                />
              )}
            </div>
          </div>

          {portraitSrc && (
            <div
              ref={portraitRef}
              className="relative w-full max-w-sm lg:max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-border"
            >
              <Image
                src={portraitSrc}
                alt={`Portrait of ${profile.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
