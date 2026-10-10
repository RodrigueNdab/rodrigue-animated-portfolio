import Reveal from '@/components/ui/Reveal';
import SectionShell from '@/components/ui/SectionShell';
import { skills } from '@/content/skills';

const Skills = () => (
  <SectionShell id="skills" label="Skills" tone="dark" words={[{ t: 'SKILLS' }]}>
    <Reveal as="ul" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((group) => (
        <li
          key={group.id}
          data-reveal
          className="rounded-2xl border border-border-subtle bg-surface-card p-6"
        >
          <h3 className="font-display text-lg font-bold text-cream mb-4">{group.title}</h3>
          <ul className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border-subtle px-3 py-1 text-sm text-light"
              >
                {item}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </Reveal>
  </SectionShell>
);

export default Skills;
