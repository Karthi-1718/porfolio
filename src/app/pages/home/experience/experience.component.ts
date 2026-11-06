import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../../core/models/portfolio.models';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent {
  entries: Experience[] = [
    {
      id: 'mca',
      type: 'education',
      title: 'Master of Computer Applications (MCA)',
      organization: 'Rathinam Technical Campus',
      period: '2024 – 2026',
      location: 'Coimbatore, Tamil Nadu',
      description: [
        'Specialization in backend systems and API development',
        'Completed projects on REST API design and database integration',
        'Gained practical knowledge of enterprise software architecture',
      ],
      technologies: ['Java', 'C#', 'SQL', 'Software Engineering', 'DBMS'],
    },
    {
      id: 'internship',
      type: 'work',
      title: 'Software Developer Intern',
      organization: 'AMDOX',
      period: '2024',
      location: 'Tamil Nadu',
      description: [
        'Worked on the NeuralRetail project — a retail intelligence platform',
        'Developed backend API endpoints for product data management',
        'Collaborated on database design and query optimization',
        'Participated in code reviews and agile development processes',
      ],
      technologies: ['API Development', 'Backend', 'Database', 'Agile'],
    },
    {
      id: 'bsc',
      type: 'education',
      title: 'Bachelor of Science in Mathematics',
      organization: 'Arulmigu Palaniandavar College of Arts and Culture',
      period: '2020 – 2023',
      location: 'Tamil Nadu',
      description: [
        'Strong foundation in analytical and logical thinking',
        'Applied mathematical concepts to programming and problem solving',
        'Developed interest in computer science and software development',
      ],
      technologies: ['Mathematics', 'Statistics', 'Logic', 'Problem Solving'],
    },
  ];
}
