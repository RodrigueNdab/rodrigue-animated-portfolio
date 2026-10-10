import type { Profile } from './types';

export const profile: Profile = {
  name: 'Rodrigue Ndabashinze',
  qualifications: 'MD, MSc Epidemiology',
  role: 'Data Manager, Clinical Trials Registries & AI',
  institution: 'University Medical Center Rostock',
  unit: 'German Centre for Child and Adolescent Health (DZKJ)',
  location: 'Rostock, Germany',
  email: 'rodrigue.ndabashinze@med.uni-rostock.de',
  intro:
    'Medical doctor and epidemiologist working at the intersection of evidence synthesis, causal inference, and AI-driven clinical-trial data harmonisation.',
  biography: [
    'I am a medical doctor (MD, University of Burundi, 2022) and epidemiologist (MSc Epidemiology, University of Antwerp, 2025 — Distinction) working in evidence synthesis, causal inference, and NLP-driven clinical-trial registry harmonisation.',
    'I am a Data Manager for Clinical Trials Registries & AI at University Medical Center Rostock, Germany, within the German Centre for Child and Adolescent Health (DZKJ).',
    'Through the Evidence Synthesis Ireland Fellowship at the University of Galway, with a placement at Unity Health Toronto, I worked on Dosing of Immune Checkpoint Inhibitors, conducted by the Knowledge Translation Program through the Post-Market Drug Evaluation CoLab Network.',
    'My research interests include causal inference, target trial emulation, AIPW, IOSW transportability, biomedical NLP, IPD and aggregate-data meta-analysis, and reproducible research workflows.',
    'I am open to research collaborations, evidence-synthesis projects, and speaking invitations.',
  ],
  links: [
    {
      id: 'university',
      label: 'University profile',
      href: 'https://kjpp.med.uni-rostock.de/dr-anne-fink-2',
    },
    { id: 'github', label: 'GitHub', href: 'https://github.com/RodrigueNdab' },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/rodrigue-ndabashinze-md-mph-msc-76093ab5/',
    },
    {
      id: 'scholar',
      label: 'Google Scholar',
      href: 'https://scholar.google.com/citations?hl=en&user=nyuAn_kAAAAJ',
    },
    {
      id: 'researchgate',
      label: 'ResearchGate',
      href: 'https://www.researchgate.net/profile/Rodrigue-Ndabashinze',
    },
  ],
  education: [
    {
      id: 'md-burundi',
      degree: 'MD',
      institution: 'University of Burundi',
      year: 2022,
    },
    {
      id: 'msc-antwerp',
      degree: 'MSc Epidemiology',
      institution: 'University of Antwerp',
      year: 2025,
      note: 'Distinction',
    },
  ],
};
