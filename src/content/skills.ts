import type { SkillGroup } from './types';

export const skills: SkillGroup[] = [
  {
    id: 'programming',
    title: 'Programming',
    items: ['R', 'Python', 'Stata', 'SQL', 'Git', 'GitHub'],
  },
  {
    id: 'causal-inference',
    title: 'Causal inference',
    items: ['Target trial emulation', 'AIPW', 'IOSW', 'DAGs', 'Propensity scores'],
  },
  {
    id: 'evidence-synthesis',
    title: 'Evidence synthesis',
    items: [
      'Systematic reviews',
      'IPD meta-analysis',
      'Aggregate-data meta-analysis',
      'Network meta-analysis',
      'Cochrane methods',
      'GRADE',
    ],
  },
  {
    id: 'ml-ai-nlp',
    title: 'ML, AI, and NLP',
    items: ['SapBERT', 'FAISS', 'Sentence transformers', 'Hugging Face'],
  },
  {
    id: 'ontologies',
    title: 'Biomedical ontologies',
    items: ['ICD-10', 'MedDRA', 'SNOMED CT', 'MeSH'],
  },
  {
    id: 'tools',
    title: 'Tools and reproducibility',
    items: ['Quarto', 'R Markdown', 'Docker', 'REDCap', 'OHDSI', 'LaTeX'],
  },
];
