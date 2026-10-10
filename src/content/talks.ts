import type { TalkRecord } from './types';

/**
 * `programme`, `slides`, `video` and `photos` paths are site-root-relative and are
 * only rendered when the file exists under `public/` (see `src/lib/assets.ts`).
 * Event dates and exact presentation dates are kept separate on purpose.
 */
export const talks: TalkRecord[] = [
  {
    id: 'gmds-iscb-subgroup',
    title:
      'Reliable Subgroup Identification and Analysis – Results of the GMDS Biostatistics Competition 2026',
    role: 'Invited presentation with Team CRAKDK',
    context: 'Third place among 17 teams and one of five teams invited to present on site.',
    event: '47th ISCB Annual Conference, jointly with the 71st GMDS Annual Conference',
    location: 'Freiburg im Breisgau, Germany',
    eventStart: '2026-09-27',
    eventEnd: '2026-10-01',
  },
  {
    id: 'nrs-colloquium',
    title:
      'Updating the evidence base for neonatal therapeutic hypothermia: trial integrity, equity, and the case for individual participant data',
    role: 'Neonatal Resuscitation Symposium (NRS) Scholar, selected presenter',
    event:
      'Emerging Neonatal Resuscitation Science Research Colloquium, part of the 9th Annual Neonatal Resuscitation Symposium at Indiana University School of Medicine',
    location: 'Indianapolis, Indiana, United States',
    eventStart: '2026-09-10',
    programme: '/uploads/Colloquium_Program_final.pdf',
    infoUrl:
      'https://medicine.iu.edu/pediatrics/specialties/neonatal-perinatal/education/resuscitation-symposium',
  },
  {
    id: 'smart-ipd',
    title: 'Artificial intelligence in IPD synthesis',
    role: 'Invited speaker',
    event:
      'SMART-IPD (Strengthening Meta-Analysis Research Through Individual Participant Data) workshop at the Society for Research Synthesis Methodology Annual Meeting',
    location: 'Chania, Crete, Greece',
    eventStart: '2026-06-09',
    programme: '/uploads/SMART-IPD_symposium_program.pdf',
  },
  {
    id: 'ctnr-summer-school',
    title:
      'CTNR Summer School 2026: Research profile and therapeutic hypothermia evidence synthesis',
    role: 'Participant research presentation',
    summary:
      'Therapeutic hypothermia for newborns with moderate or severe encephalopathy; systematic reviews and meta-analyses; trial integrity; health equity; AI and causal inference in evidence synthesis.',
    event: 'CTNR Summer School 2026',
    organisation: 'Centre for Transdisciplinary Neurosciences Rostock (CTNR)',
    location: 'Gut Gremmelin, Germany',
    eventStart: '2026-09-10',
    eventEnd: '2026-09-11',
    programme: '/uploads/Programme_CTNR_Summerschool_2026.pdf',
    infoUrl: 'https://ctnr.med.uni-rostock.de/ctnr-summer-school-2026',
  },
];
