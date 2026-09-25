export interface ProfileData {
  name: string;
  handle: string;
  title: string;
  location: string;
  availability: string;
  avatarUrl?: string;
  bioHeadline: string;
  bioNarrative: string[];
  email: string;
  socials: {
    github: string;
    linkedin: string;
    twitter?: string;
  };
  metrics: {
    label: string;
    value: string;
    context: string;
  }[];
  pillars: {
    index: string;
    title: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    period: string;
    grade: string;
    details?: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    status: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'systems' | 'frontend' | 'tools';
  categoryLabel: string;
  year: string;
  summary: string;
  challenge: string;
  solution: string;
  architecture: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  bentoSpan?: string;
  themeColor: string;
}

export interface Achievement {
  id: string;
  year: string;
  title: string;
  issuer: string;
  context: string;
  metric: string;
  category: 'Award' | 'Architecture' | 'Open Source' | 'Publication';
}

export interface SkillItem {
  name: string;
  level: number; // 1-100
  years: string;
  highlight: string;
  associatedProjects: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  summary: string;
  skills: SkillItem[];
}
