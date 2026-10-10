import Reveal from '@/components/ui/Reveal';
import SectionShell from '@/components/ui/SectionShell';
import TalkGallery from '@/components/talks/TalkGallery';
import type { TalkRecord } from '@/content/types';
import { formatDate, formatDayRange } from '@/lib/dates';

const actionClass =
  'inline-block rounded-full border border-[#141516]/60 px-4 py-2 text-sm font-medium text-charcoal hover:bg-charcoal/5 transition-colors duration-300';

const Detail = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="grid gap-0.5 sm:grid-cols-[9rem_1fr] sm:gap-4">
    <dt className="font-mono text-xs uppercase tracking-widest text-warm pt-0.5">{label}</dt>
    <dd className="text-charcoal">{children}</dd>
  </div>
);

const Talks = ({ talks }: { talks: TalkRecord[] }) => (
  <SectionShell
    id="talks"
    label="Talks and presentations"
    tone="light"
    words={[{ t: 'TALKS &' }, { t: 'presentations', serif: true }]}
  >
    <Reveal as="ul" className="grid gap-6 lg:grid-cols-2" stagger={0.1}>
      {talks.map((talk) => {
        const multiDay = Boolean(talk.eventEnd && talk.eventEnd !== talk.eventStart);
        return (
          <li key={talk.id} data-reveal className="h-full">
            <article
              id={`talk-${talk.id}`}
              className="h-full rounded-3xl border border-border bg-white/50 p-6 sm:p-8"
            >
              <h3 className="font-display text-xl sm:text-2xl font-bold text-charcoal leading-snug mb-5">
                {talk.title}
              </h3>
              <dl className="space-y-3 text-sm sm:text-base">
                <Detail label="Role">{talk.role}</Detail>
                {talk.context && <Detail label="Context">{talk.context}</Detail>}
                <Detail label="Event">{talk.event}</Detail>
                {talk.organisation && <Detail label="Organisation">{talk.organisation}</Detail>}
                <Detail label="Location">{talk.location}</Detail>
                <Detail label={multiDay ? 'Event dates' : 'Event date'}>
                  <time dateTime={talk.eventStart}>
                    {formatDayRange(talk.eventStart, talk.eventEnd)}
                  </time>
                </Detail>
                {talk.presentationDate && (
                  <Detail label="Presentation date">
                    <time dateTime={talk.presentationDate}>
                      {formatDate(talk.presentationDate)}
                    </time>
                  </Detail>
                )}
                {talk.summary && <Detail label="Summary">{talk.summary}</Detail>}
              </dl>

              {(talk.programme || talk.infoUrl || talk.slides) && (
                <ul className="mt-6 flex flex-wrap gap-3">
                  {talk.programme && (
                    <li>
                      <a
                        href={talk.programme}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={actionClass}
                      >
                        Programme (PDF)
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  )}
                  {talk.slides && (
                    <li>
                      <a
                        href={talk.slides}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={actionClass}
                      >
                        Slides
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  )}
                  {talk.infoUrl && (
                    <li>
                      <a
                        href={talk.infoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={actionClass}
                      >
                        Event information
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  )}
                </ul>
              )}

              {talk.video && (
                <video
                  controls
                  preload="none"
                  className="mt-6 w-full rounded-2xl border border-border"
                  aria-label={talk.video.title}
                >
                  <source src={talk.video.src} />
                </video>
              )}

              {talk.photos && talk.photos.length > 0 && (
                <TalkGallery photos={talk.photos} label={talk.title} />
              )}
            </article>
          </li>
        );
      })}
    </Reveal>
  </SectionShell>
);

export default Talks;
