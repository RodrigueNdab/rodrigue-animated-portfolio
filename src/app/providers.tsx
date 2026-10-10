'use client';

import React, { useRef, startTransition, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { TransitionRouter } from 'next-transition-router';
import { useLenis } from '@/components/providers/SmoothScrollProvider';
import Lenis from 'lenis';
import { safeSessionStorage } from '@/utils/storage';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

let _isCurtainCovering = false;

const HOME_SCROLL_KEY = 'home-scroll';

const isPublicationPage = (path?: string | null) => !!path && /^\/publication\/[^/]+\/?$/.test(path);

const getReturnTarget = () => {
  const saved = safeSessionStorage.getItem(HOME_SCROLL_KEY);
  const path = window.location.pathname;
  return saved && (path === '/' || path === '') ? parseInt(saved, 10) : 0;
};

function restoreScroll(target: number, lenisInst: React.RefObject<Lenis | null> | null) {
  const lenisObj = lenisInst?.current || (typeof window !== 'undefined' ? window.__lenis : null);
  document.documentElement.scrollTop = target;
  document.body.scrollTop = target;
  if (lenisObj) {
    lenisObj.scrollTo(target, { immediate: true });
    lenisObj.start();
  }
  requestAnimationFrame(() => {
    document.documentElement.scrollTop = target;
    document.body.scrollTop = target;
    if (lenisObj) lenisObj.scrollTo(target, { immediate: true });
    ScrollTrigger.refresh();
  });
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const firstLayer = useRef<HTMLDivElement | null>(null);
  const secondLayer = useRef<HTMLDivElement | null>(null);
  const scrollTargetRef = useRef<number>(0);
  const lenis = useLenis() as React.RefObject<Lenis | null> | null;
  const pathname = usePathname();

  const lenisRef = useRef(lenis);
  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (isPublicationPage(pathname)) {
      if (!history.state || history.state.isDummy !== true) {
        history.pushState({ isDummy: true }, '', window.location.href);
      }
    }
  }, [pathname]);

  useEffect(() => {
    const playCurtainIn = () => {
      if (_isCurtainCovering) return;
      _isCurtainCovering = true;
      const lenisInst = lenisRef.current;
      if (lenisInst?.current) lenisInst.current.stop();

      const tl = gsap.timeline({
        onComplete: () => {
          history.back();
          setTimeout(() => {
            if (_isCurtainCovering) {
              playCurtainOut(getReturnTarget());
            }
          }, 1500);
        },
      });
      tl.fromTo(firstLayer.current, { y: '100%' }, { y: '0%', duration: 0.45, ease: 'circ.inOut' })
        .fromTo(secondLayer.current, { y: '100%' }, { y: '0%', duration: 0.45, ease: 'circ.inOut' }, '<50%');
    };

    const playCurtainOut = (target: number) => {
      _isCurtainCovering = false;
      const lenisInst = lenisRef.current;
      if (lenisInst?.current) lenisInst.current.stop();
      if (window.__lenis) window.__lenis.scrollTo(target, { immediate: true });
      document.documentElement.scrollTop = target;
      document.body.scrollTop = target;

      let scrollLockActive = true;
      const runScrollLock = () => {
        if (!scrollLockActive) return;
        document.documentElement.scrollTop = target;
        document.body.scrollTop = target;
        requestAnimationFrame(runScrollLock);
      };
      requestAnimationFrame(runScrollLock);

      const tl = gsap.timeline({
        onComplete: () => {
          if (window.__lenis) window.__lenis.scrollTo(target, { immediate: true });
          document.documentElement.scrollTop = target;
          document.body.scrollTop = target;
          setTimeout(() => {
            scrollLockActive = false;
            restoreScroll(target, lenisInst);
          }, 16);
        },
      });

      tl.fromTo(secondLayer.current, { y: '0%' }, { y: '-100%', duration: 0.45, ease: 'circ.inOut' })
        .fromTo(firstLayer.current, { y: '0%' }, { y: '-100%', duration: 0.45, ease: 'circ.inOut' }, '<50%');
    };

    const handlePopState = (event: PopStateEvent) => {
      const path = window.location.pathname;
      if (isPublicationPage(path) && (!event.state || event.state.isDummy !== true)) {
        playCurtainIn();
        return;
      }

      if (_isCurtainCovering) {
        playCurtainOut(getReturnTarget());
        return;
      }

      if (path === '/' || path === '') {
        const savedScroll = safeSessionStorage.getItem(HOME_SCROLL_KEY);
        if (savedScroll) {
          restoreScroll(parseInt(savedScroll, 10), lenisRef.current);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <TransitionRouter
      auto={true}
      leave={(next: () => void, _from?: string, to?: string) => {
        if (lenis?.current) lenis.current.stop();
        const isGoingToProject = isPublicationPage(to);
        const savedScroll = safeSessionStorage.getItem(HOME_SCROLL_KEY);
        const isReturningHome = (to === '/' || to === '' || !to) && savedScroll && !isGoingToProject;
        if (isGoingToProject) safeSessionStorage.setItem('navigating-to-project', 'true');
        scrollTargetRef.current = isReturningHome ? parseInt(savedScroll, 10) : 0;

        const tl = gsap
          .timeline({ onComplete: next })
          .fromTo(
            firstLayer.current,
            { y: '100%' },
            { y: '0%', duration: 0.5, ease: 'circ.inOut' }
          )
          .fromTo(
            secondLayer.current,
            { y: '100%' },
            { y: '0%', duration: 0.5, ease: 'circ.inOut' },
            '<50%'
          );

        tl.add(() => {
          document.documentElement.scrollTop = scrollTargetRef.current;
          document.body.scrollTop = scrollTargetRef.current;
          if (window.__lenis) window.__lenis.scrollTo(scrollTargetRef.current, { immediate: true });
        }, 0.5);

        return () => {
          tl.kill();
        };
      }}
      enter={(next: () => void) => {
        if (_isCurtainCovering) {
          _isCurtainCovering = false;
          startTransition(next);
          return () => {};
        }

        let scrollLockActive = false;
        const runScrollLock = () => {
          if (!scrollLockActive) return;
          const y = scrollTargetRef.current;
          document.documentElement.scrollTop = y;
          document.body.scrollTop = y;
          requestAnimationFrame(runScrollLock);
        };

        const tl = gsap
          .timeline({
            onComplete: () => {
              const target = scrollTargetRef.current;
              if (window.__lenis) window.__lenis.scrollTo(target, { immediate: true });
              document.documentElement.scrollTop = target;
              document.body.scrollTop = target;
              setTimeout(() => {
                scrollLockActive = false;
                restoreScroll(target, lenis);
              }, 16);
            },
          })
          .fromTo(
            secondLayer.current,
            { y: '0%' },
            { y: '-100%', duration: 0.5, ease: 'circ.inOut' }
          )
          .fromTo(
            firstLayer.current,
            { y: '0%' },
            { y: '-100%', duration: 0.5, ease: 'circ.inOut' },
            '<50%'
          )
          .call(() => {
            requestAnimationFrame(() => {
              startTransition(next);
            });
          }, undefined, '<50%');

        tl.add(() => {
          const isNavigatingToProject = safeSessionStorage.getItem('navigating-to-project') === 'true';
          const savedScroll = safeSessionStorage.getItem(HOME_SCROLL_KEY);
          if (!isNavigatingToProject && savedScroll) {
            scrollTargetRef.current = parseInt(savedScroll, 10);
            safeSessionStorage.removeItem(HOME_SCROLL_KEY);
          } else {
            scrollTargetRef.current = 0;
          }
          safeSessionStorage.removeItem('navigating-to-project');
          document.documentElement.scrollTop = scrollTargetRef.current;
          document.body.scrollTop = scrollTargetRef.current;
          if (window.__lenis) window.__lenis.scrollTo(scrollTargetRef.current, { immediate: true });
          scrollLockActive = true;
          requestAnimationFrame(runScrollLock);
        }, 0);

        return () => {
          scrollLockActive = false;
          tl.kill();
        };
      }}
    >
      <main id="main-content">{children}</main>

      <div
        ref={firstLayer}
        className="fixed inset-0 z-[9994] translate-y-full bg-accent pointer-events-none"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={secondLayer}
        className="fixed inset-0 z-[9995] translate-y-full bg-ink pointer-events-none"
        style={{ willChange: 'transform' }}
      />
    </TransitionRouter>
  );
}
