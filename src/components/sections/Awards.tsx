import Reveal from '@/components/ui/Reveal';
import SectionShell from '@/components/ui/SectionShell';
import { awards } from '@/content/awards';

const Awards = () => (
  <SectionShell
    id="awards"
    label="Awards and honours"
    tone="dark"
    words={[{ t: 'AWARDS &' }, { t: 'honours', serif: true }]}
  >
    <Reveal as="ul" className="grid gap-5 md:grid-cols-2">
      {awards.map((award) => (
        <li
          key={award.id}
          data-reveal
          className="rounded-2xl border border-border-subtle bg-surface-card p-6"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
            {award.category}
          </p>
          <h3 className="font-display text-lg sm:text-xl font-bold text-cream mb-1">
            {award.title}
          </h3>
          <p className="text-gray-soft text-base">{award.description}</p>
        </li>
      ))}
    </Reveal>
  </SectionShell>
);

export default Awards;
