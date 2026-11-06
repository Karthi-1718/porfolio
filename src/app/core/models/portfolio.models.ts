export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string; // honeypot
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl: string;
  featured: boolean;
  category: string;
  imageColor: string;
}

export interface Skill {
  name: string;
  category: 'backend' | 'database' | 'frontend' | 'tools';
  icon?: string;
}

export interface Experience {
  id: string;
  type: 'work' | 'education';
  title: string;
  organization: string;
  period: string;
  location?: string;
  description: string[];
  technologies?: string[];
}
