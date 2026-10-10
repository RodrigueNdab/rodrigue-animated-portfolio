import type { PublicationRecord } from './types';

/**
 * Only title, year, venue and type were supplied. Add `authors`, `doi`, `url`
 * and `abstract` here once verified against the publisher page; the UI renders
 * optional fields only when present.
 */
export const publications: PublicationRecord[] = [
  {
    id: 'dosing-immune-checkpoint-inhibitors',
    slug: 'dosing-immune-checkpoint-inhibitors',
    title: 'Dosing of Immune Checkpoint Inhibitors',
    year: 2026,
    venue: 'Canadian Journal of Health Technologies',
    type: 'Journal article',
  },
  {
    id: 'icd10-harmonization-germany',
    slug: 'icd10-harmonization-germany',
    title:
      'Towards understanding the disease landscape of clinical trials in Germany: Ontology and embedding-based pipelines versus Large Language Models for ICD-10 Harmonization',
    year: 2026,
    venue: 'medRxiv',
    type: 'Preprint',
  },
  {
    id: 'pan-resistant-pseudomonas',
    slug: 'pan-resistant-pseudomonas',
    title:
      'Pan-Resistant Pseudomonas aeruginosa Septic Shock: A Case Report and Review of the Literature',
    year: 2026,
    venue: 'Clinical Medicine Insights: Case Reports',
    type: 'Journal article',
  },
  {
    id: 'neonatal-mortality-burundi',
    slug: 'neonatal-mortality-burundi',
    title: 'Determinants of neonatal mortality at Kamenge Teaching Hospital, Burundi',
    year: 2025,
    venue: 'BMC Public Health',
    type: 'Journal article',
  },
  {
    id: 'necrotic-erythema-nodosum',
    slug: 'necrotic-erythema-nodosum',
    title:
      'Necrotic erythema nodosum leprosum: A rare and severe manifestation of leprosy reaction',
    year: 2025,
    venue: 'IDCases',
    type: 'Journal article',
  },
];
