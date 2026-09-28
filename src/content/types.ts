// Canonical content types for Muhammad Naufal Hafiz's portfolio.
// UI must import from here. Never hardcode entries in components.
// Missing data stays empty / optional. Never invent values.

export interface ProfileLink {
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  headline?: string;
  bio?: string;
  email?: string;
  linkedin?: string;
  profileImage?: string;
  cvUrl?: string;
  location?: string;
  summary?: string;
  links?: ProfileLink[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  summary?: string;
  bullets?: string[];
  skills?: string[];
  tags?: string[];
  images?: string[];
  link?: string;
  featured?: boolean;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  problem?: string;
  approach?: string;
  evidence?: string;
  outcome?: string;
  skills?: string[];
  tools?: string[];
  images?: string[];
  links?: ProjectLink[];
  relatedExperiences?: string[];
  relatedCredentials?: string[];
}

export type CredentialStatus = "completed" | "in-progress";

export interface Credential {
  id: string;
  title: string;
  issuer?: string;
  date?: string;
  credentialUrl?: string;
  skills?: string[];
  image?: string;
  status?: CredentialStatus;
  relatedExperiences?: string[];
  relatedProjects?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree?: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  status?: CredentialStatus;
  description?: string;
  skills?: string[];
}

export interface Volunteering {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  category?: string;
  description?: string;
  skills?: string[];
  images?: string[];
  featured?: boolean;
}

export interface EvidenceReference {
  type: "experience" | "project" | "credential" | "education" | "volunteering";
  id: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  description?: string;
  evidence?: EvidenceReference[];
}

export interface Relationship {
  source: string;
  target: string;
  type: string;
  explanation?: string;
}
