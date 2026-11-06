import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  selectedProject = signal<Project | null>(null);

  projects: Project[] = [
    {
      id: 'client360api',
      title: 'Client360API',
      description:
        'Backend API development with ASP.NET Core, SQL Server, database integration, and structured API architecture. Features multi-layered architecture with repository pattern, DTOs, and middleware.',
      technologies: ['C#', 'ASP.NET Core Web API', 'SQL Server', 'ADO.NET', 'Swagger'],
      githubUrl: 'https://github.com/karthikeyan', // ⚠️ PLACEHOLDER – Replace with actual URL
      demoUrl: '#', // ⚠️ PLACEHOLDER – Replace with actual URL
      featured: true,
      category: 'Backend',
      imageColor: '#1e3a5f',
    },
    {
      id: 'student-mgmt',
      title: 'Student Management API',
      description:
        'REST API for managing students, enrollments, courses, and grades. Fully documented with Swagger UI, includes CRUD operations, pagination, filtering, and role-based access.',
      technologies: ['ASP.NET Core', 'Dapper', 'SQL Server', 'Swagger', 'C#'],
      githubUrl: 'https://github.com/karthikeyan', // ⚠️ PLACEHOLDER
      demoUrl: '#', // ⚠️ PLACEHOLDER
      featured: true,
      category: 'Backend',
      imageColor: '#3b0764',
    },
    {
      id: 'turfspot',
      title: 'TurfSpot',
      description:
        'Full-stack turf booking application with separate user, owner, and admin dashboards. Includes slot booking, payment flow, real-time availability, and email notifications.',
      technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
      githubUrl: 'https://github.com/karthikeyan', // ⚠️ PLACEHOLDER
      demoUrl: '#', // ⚠️ PLACEHOLDER
      featured: true,
      category: 'Full-Stack',
      imageColor: '#064e3b',
    },
    {
      id: 'secureshare',
      title: 'SecureShare',
      description:
        'Secure encrypted file transfer application with end-to-end encryption. Files are encrypted using AES-256 before transfer and decrypted only by intended recipient.',
      technologies: ['Python', 'Flask', 'Cryptography', 'AES-256'],
      githubUrl: 'https://github.com/karthikeyan', // ⚠️ PLACEHOLDER
      demoUrl: '#', // ⚠️ PLACEHOLDER
      featured: false,
      category: 'Security',
      imageColor: '#1c1917',
    },
  ];

  categoryColors: Record<string, string> = {
    Backend: '#3b82f6',
    'Full-Stack': '#7c3aed',
    Security: '#10b981',
  };

  openModal(project: Project): void {
    this.selectedProject.set(project);
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.selectedProject.set(null);
    document.body.style.overflow = '';
  }

  getCategoryColor(cat: string): string {
    return this.categoryColors[cat] ?? '#3b82f6';
  }
}
