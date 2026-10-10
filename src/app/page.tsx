/**
 * @license
 * Copyright (c) 2026 Aitezaz Sikandar. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 * Project: Portfolio
 * Author: Aitezaz Sikandar (aitezazdev)
 * Website: https://aitezazdev.vercel.app
 */

import HomeBanner from '@/components/sections/HomeBanner';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Research from '@/components/sections/Research';
import Publications from '@/components/sections/Publications';
import Talks from '@/components/sections/Talks';
import Skills from '@/components/sections/Skills';
import Awards from '@/components/sections/Awards';
import CurvedSectionDivider from '@/components/ui/CurvedSectionDivider';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import HomeScrollOrchestrator from '@/components/home/HomeScrollOrchestrator';
import { talks } from '@/content/talks';
import { findCv, findPortrait, resolveTalkAssets } from '@/lib/assets';
import { getContactConfig } from '@/lib/contactConfig';

export default function Home() {
  const resolvedTalks = talks.map(resolveTalkAssets);
  const formEnabled = getContactConfig().enabled;

  return (
    <>
      <Navbar />
      <HomeScrollOrchestrator
        banner={<HomeBanner portraitSrc={findPortrait()} cvHref={findCv()} />}
        about={
          <>
            <About />
            <Experience />
          </>
        }
      >
        <CurvedSectionDivider curveColor="#0A0F0D" bottomColor="#E2E8E4" />
        <div className="relative z-20 bg-cream">
          <Research />
          <Publications />
          <Talks talks={resolvedTalks} />
        </div>
        <CurvedSectionDivider curveColor="#E2E8E4" bottomColor="#0A0F0D" />
        <div className="relative z-25 bg-ink overflow-hidden">
          <Skills />
          <Awards />
          <Contact formEnabled={formEnabled} />
          <Footer />
        </div>
      </HomeScrollOrchestrator>
    </>
  );
}
