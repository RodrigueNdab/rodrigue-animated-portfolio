import { Link } from 'next-transition-router';
import Reveal from '@/components/ui/Reveal';
import SectionShell from '@/components/ui/SectionShell';
import PublicationList from '@/components/publications/PublicationList';
import { publications } from '@/content/publications';

const Publications = () => (
  <SectionShell id="publications" label="Publications" tone="light" words={[{ t: 'PUBLICATIONS' }]}>
    <Reveal>
      <div data-reveal>
        <PublicationList items={publications} tone="light" />
      </div>
      <p data-reveal className="mt-6">
        <Link
          href="/publication/"
          className="inline-block rounded-full border-2 border-[#141516] px-6 py-2.5 text-sm font-medium text-charcoal hover:bg-charcoal/5 transition-colors duration-300"
        >
          Browse, search and filter all publications →
        </Link>
      </p>
    </Reveal>
  </SectionShell>
);

export default Publications;
