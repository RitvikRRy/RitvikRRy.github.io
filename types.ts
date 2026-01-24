
export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  icons?: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}
