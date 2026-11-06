import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SkillItem {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Familiar';
}

interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  skills: SkillItem[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent {
  activeCategory = 'backend';

  categories: SkillCategory[] = [
    {
      id: 'backend',
      label: 'Backend',
      icon: '⚙️',
      color: '#3b82f6',
      skills: [
        { name: 'C#', level: 'Advanced' },
        { name: 'ASP.NET Core Web API', level: 'Advanced' },
        { name: 'Node.js', level: 'Intermediate' },
        { name: 'Express.js', level: 'Intermediate' },
        { name: 'Python', level: 'Intermediate' },
        { name: 'REST API Development', level: 'Advanced' },
      ],
    },
    {
      id: 'database',
      label: 'Database',
      icon: '🗄️',
      color: '#7c3aed',
      skills: [
        { name: 'SQL Server', level: 'Advanced' },
        { name: 'MySQL', level: 'Intermediate' },
        { name: 'MongoDB', level: 'Intermediate' },
        { name: 'ADO.NET', level: 'Advanced' },
        { name: 'Dapper ORM', level: 'Advanced' },
      ],
    },
    {
      id: 'frontend',
      label: 'Frontend',
      icon: '🖥️',
      color: '#06b6d4',
      skills: [
        { name: 'Angular', level: 'Intermediate' },
        { name: 'React', level: 'Intermediate' },
        { name: 'TypeScript', level: 'Intermediate' },
        { name: 'JavaScript', level: 'Intermediate' },
        { name: 'HTML & CSS', level: 'Advanced' },
        { name: 'Tailwind CSS', level: 'Intermediate' },
      ],
    },
    {
      id: 'tools',
      label: 'Tools',
      icon: '🛠️',
      color: '#10b981',
      skills: [
        { name: 'Visual Studio', level: 'Advanced' },
        { name: 'VS Code', level: 'Expert' },
        { name: 'Git & GitHub', level: 'Advanced' },
        { name: 'Postman', level: 'Advanced' },
        { name: 'Swagger / OpenAPI', level: 'Advanced' },
        { name: 'Docker', level: 'Familiar' },
      ],
    },
  ];

  get activeSkills(): SkillItem[] {
    return this.categories.find(c => c.id === this.activeCategory)?.skills ?? [];
  }

  get activeColor(): string {
    return this.categories.find(c => c.id === this.activeCategory)?.color ?? '#3b82f6';
  }

  getLevelWidth(level: string): number {
    const map: Record<string, number> = {
      Expert: 95,
      Advanced: 80,
      Intermediate: 65,
      Familiar: 45,
    };
    return map[level] ?? 50;
  }

  getLevelColor(level: string): string {
    const map: Record<string, string> = {
      Expert: '#3b82f6',
      Advanced: '#7c3aed',
      Intermediate: '#06b6d4',
      Familiar: '#10b981',
    };
    return map[level] ?? '#3b82f6';
  }

  setCategory(id: string): void {
    this.activeCategory = id;
  }
}
