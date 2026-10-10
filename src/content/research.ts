import type { ResearchTheme } from './types';

export const research: ResearchTheme[] = [
  {
    id: 'registry-harmonisation-nlp',
    title: 'Clinical-trial registry harmonisation and biomedical NLP',
    summary:
      'Harmonising clinical-trial registry data with NLP, comparing ontology- and embedding-based pipelines with large language models for ICD-10 coding of the disease landscape of clinical trials in Germany.',
    publicationIds: ['icd10-harmonization-germany'],
  },
  {
    id: 'evidence-synthesis-meta-analysis',
    title: 'Evidence synthesis and meta-analysis',
    summary:
      'Systematic reviews and meta-analysis using individual participant data (IPD) and aggregate data, including work on the dosing of immune checkpoint inhibitors during the Evidence Synthesis Ireland Fellowship and the role of AI in IPD synthesis.',
    publicationIds: ['dosing-immune-checkpoint-inhibitors'],
    talkIds: ['smart-ipd', 'nrs-colloquium', 'ctnr-summer-school'],
  },
  {
    id: 'causal-inference-transportability',
    title: 'Causal inference and transportability',
    summary:
      'Methodological interests in target trial emulation, AIPW and IOSW transportability, building on a research internship in causal inference and machine learning at the Julius Center, UMC Utrecht.',
    talkIds: ['ctnr-summer-school'],
  },
  {
    id: 'neonatal-hypothermia-evidence-synthesis',
    title: 'Neonatal therapeutic hypothermia evidence synthesis',
    summary:
      'Evidence synthesis on therapeutic hypothermia for newborns with moderate or severe encephalopathy, including trial integrity, health equity, and the case for individual participant data.',
    talkIds: ['nrs-colloquium', 'ctnr-summer-school'],
  },
];
