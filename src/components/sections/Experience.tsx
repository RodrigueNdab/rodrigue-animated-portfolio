import Reveal from '@/components/ui/Reveal';
import SectionShell from '@/components/ui/SectionShell';
import { experience } from '@/content/experience';
import { formatMonthRange } from '@/lib/dates';

const Experience = () => (
  <SectionShell id="experience" label="Experience" tone="dark" words={[{ t: 'EXPERIENCE' }]}>
    <Reveal as="ol" className="relative border-l border-border-subtle ml-2 space-y-8">
      {experience.map((role) => (
        <li key={role.id} data-reveal className="relative pl-6 sm:pl-8">
          <span
            aria-hidden="true"
            className={`absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full ${
              role.ongoing ? 'bg-accent' : 'bg-gray-soft'
            }`}
          />
          <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-gray-soft mb-1">
            <time dateTime={role.start}>
              {formatMonthRange(role.start, role.end, role.ongoing)}
            </time>
          </p>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-cream">{role.title}</h3>
          <p className="text-light/80 text-base sm:text-lg">
            {role.organization}
            {role.unit ? ` (${role.unit})` : ''}
          </p>
        </li>
      ))}
    </Reveal>
  </SectionShell>
);

export default Experience;
