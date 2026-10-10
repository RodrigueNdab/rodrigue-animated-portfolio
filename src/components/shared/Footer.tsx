'use client';

import React, { useRef } from 'react';
import AnimatedLink from '@/components/ui/AnimateLink';
import Magnetic from '@/components/ui/Magnetic';
import { FaArrowUp } from 'react-icons/fa';
import { useHandleLinkClick } from '@/lib/navigation';
import { useLenis } from '@/components/providers/SmoothScrollProvider';
import { site, socialList, navLinks } from '@/lib/site';
import { profile } from '@/content/profile';
import Lenis from 'lenis';

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const lenisRef = useLenis() as React.RefObject<Lenis | null> | null;
  const lenis = lenisRef?.current;

  const handleLinkClick = useHandleLinkClick();
  const links = navLinks.filter((l) => !('menuOnly' in l && l.menuOnly));

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative z-30 bg-ink border-t border-border-subtle px-6 sm:px-8 md:px-12 py-12 md:py-16"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-10 md:mb-12">
          <div>
            <h3 className="text-light/90 text-base sm:text-lg font-sans tracking-wide font-semibold mb-4 md:mb-6">
              Menu
            </h3>
            <ul className="flex flex-col gap-3 sm:gap-4 text-gray-soft text-xs sm:text-sm font-sans font-medium uppercase tracking-wide">
              {links.map((link) => (
                <AnimatedLink key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                  >
                    {link.name}
                  </a>
                </AnimatedLink>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-light/90 text-base sm:text-lg font-sans tracking-wide font-semibold mb-4 md:mb-6">
              Socials
            </h3>
            <ul className="flex flex-col gap-3 sm:gap-4 text-gray-soft text-xs sm:text-sm font-sans font-medium uppercase tracking-wide">
              {socialList.map((s) => (
                <AnimatedLink key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </AnimatedLink>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 mt-6 md:mt-0">
            <h3 className="text-light/90 text-base sm:text-lg font-sans tracking-wide font-semibold mb-2 md:mb-6">
              Contact
            </h3>
            <address className="not-italic text-gray-soft text-sm sm:text-base font-sans leading-relaxed">
              {site.name}
              <br />
              {profile.institution}
              <br />
              {site.location}
              <br />
              <a
                href={`mailto:${site.email}`}
                className="underline underline-offset-4 hover:text-accent transition-colors duration-300 break-all"
              >
                {site.email}
              </a>
            </address>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-6 md:flex-row md:items-end md:justify-between">
          <div className="text-gray-soft text-xs sm:text-sm leading-relaxed max-w-3xl space-y-1">
            <p>
              © {new Date().getFullYear()} {site.name}. Content adapted from rodriguendabashinze.com
              is licensed under{' '}
              <a
                href="https://creativecommons.org/licenses/by-nc-nd/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-accent"
              >
                CC BY-NC-ND 4.0
              </a>
              ; publications, journal articles and other third-party materials remain subject to
              their own terms.
            </p>
            <p>
              Site code is released under the MIT License and is based on the open-source{' '}
              <a
                href="https://github.com/aitezazdev/Portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-accent"
              >
                Portfolio template
              </a>{' '}
              by Aitezaz Sikandar.
            </p>
          </div>
          <Magnetic strength={0.4}>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-elevated-dark border border-border-subtler flex items-center justify-center text-gray-soft hover:text-accent hover:border-accent hover:bg-accent/10 transition-all duration-300 group"
              aria-label="Scroll to top"
            >
              <FaArrowUp className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
