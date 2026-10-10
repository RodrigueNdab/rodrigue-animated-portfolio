import Reveal from '@/components/ui/Reveal';
import SectionShell from '@/components/ui/SectionShell';
import { profile } from '@/content/profile';

const About = () => (
  <SectionShell
    id="about"
    label="About"
    tone="dark"
    words={[{ t: 'ABOUT' }, { t: 'me', serif: true }]}
  >
    <Reveal className="grid gap-12 lg:grid-cols-[3fr_2fr]">
      <div className="space-y-5 text-base sm:text-lg leading-relaxed text-light/90 max-w-3xl">
        {profile.biography.map((paragraph) => (
          <p key={paragraph} data-reveal>
            {paragraph}
          </p>
        ))}
      </div>

      <div className="space-y-10">
        <div data-reveal>
          <h3 className="font-mono text-xs uppercase tracking-widest text-gray-soft mb-4">
            Education
          </h3>
          <ul className="space-y-4">
            {profile.education.map((degree) => (
              <li
                key={degree.id}
                className="rounded-2xl border border-border-subtle bg-surface-card px-5 py-4"
              >
                <p className="font-display text-lg font-bold text-cream">{degree.degree}</p>
                <p className="text-gray-soft text-sm sm:text-base">
                  {degree.institution}, {degree.year}
                  {degree.note ? ` — ${degree.note}` : ''}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal>
          <h3 className="font-mono text-xs uppercase tracking-widest text-gray-soft mb-4">
            Find me online
          </h3>
          <ul className="flex flex-wrap gap-3">
            {profile.links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full border border-border-subtle px-4 py-2 text-sm text-light hover:border-accent hover:text-accent transition-colors duration-300"
                >
                  {link.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  </SectionShell>
);

export default About;
