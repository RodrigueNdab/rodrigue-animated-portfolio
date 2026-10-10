/** ISO 8601 date: `YYYY-MM-DD` for a known day, `YYYY-MM` when only the month is known, `YYYY` for year only. */
export type IsoDate = string;

export interface ProfileLink {
  id: 'university' | 'github' | 'linkedin' | 'scholar' | 'researchgate';
  label: string;
  href: string;
}

export interface Degree {
  id: string;
  degree: string;
  field?: string;
  institution: string;
  year: number;
  note?: string;
}

export interface Profile {
  name: string;
  qualifications: string;
  role: string;
  institution: string;
  unit: string;
  location: string;
  email: string;
  intro: string;
  biography: string[];
  links: ProfileLink[];
  education: Degree[];
}

export interface ExperienceRecord {
  id: string;
  title: string;
  organization: string;
  unit?: string;
  start: IsoDate;
  end?: IsoDate;
  ongoing?: boolean;
}

export interface ResearchTheme {
  id: string;
  title: string;
  summary: string;
  publicationIds?: string[];
  talkIds?: string[];
}

export type PublicationType = 'Journal article' | 'Preprint';

export interface PublicationRecord {
  id: string;
  slug: string;
  title: string;
  year: number;
  venue: string;
  type: PublicationType;
  authors?: string[];
  doi?: string;
  url?: string;
  abstract?: string;
}

export interface TalkPhoto {
  src: string;
  alt: string;
  caption?: string;
}

export interface TalkRecord {
  id: string;
  title: string;
  role: string;
  context?: string;
  summary?: string;
  event: string;
  organisation?: string;
  location: string;
  eventStart: IsoDate;
  eventEnd?: IsoDate;
  /** Only set when the exact presentation date is known; distinct from the event dates. */
  presentationDate?: IsoDate;
  programme?: string;
  infoUrl?: string;
  slides?: string;
  video?: { src: string; title: string };
  photos?: TalkPhoto[];
}

export interface SkillGroup {
  id: string;
  title: string;
  items: string[];
}

export type AwardCategory = 'Scholarship' | 'Grant' | 'Membership';

export interface AwardRecord {
  id: string;
  title: string;
  category: AwardCategory;
  description: string;
}
