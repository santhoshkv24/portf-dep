export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  technologies: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  cgpa?: string;
  score?: string;
  details?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  link?: string;
  date?: string;
}

export interface SkillCategory {
  category: 'Languages' | 'Frameworks & Technologies' | 'Tools' | 'Core Competencies' | (string & {});
  skills: string[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectCaseStudy {
  id: 'bny-eliza' | 'urban-resolve' | 'hire-matrix' | 'organica-ops';
  index: string;
  title: string;
  subtitle: string;
  category: string;
  role?: string;
  period?: string;
  problem: string;
  solution: string;
  highlights: string[];
  technologies: string[];
  simulatorType: 'bny' | 'urban-resolve' | 'hire-matrix' | 'organica';
  metrics?: ProjectMetric[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface ResumeData {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  linkedinUrl: string;
  github: string;
  githubUrl: string;
  profileSummary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  skills: SkillCategory[];
}
