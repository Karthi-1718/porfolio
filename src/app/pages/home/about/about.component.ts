import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  highlights = [
    { icon: '🎓', label: 'MCA Graduate', desc: 'Rathinam Technical Campus, 2026' },
    { icon: '🔧', label: 'API Development', desc: 'REST APIs · ASP.NET · Node.js' },
    { icon: '⚙️', label: 'Backend Engineering', desc: 'Architecture · Database · Security' },
    { icon: '💡', label: 'Problem Solving', desc: 'Clean code · Scalable solutions' },
  ];

  coreValues = [
    { label: 'Clean Architecture', icon: '🏗️' },
    { label: 'RESTful APIs', icon: '🔌' },
    { label: 'Database Design', icon: '🗄️' },
    { label: 'Secure Systems', icon: '🔐' },
    { label: 'Tamil Nadu', icon: '📍' },
    { label: 'Open to Work', icon: '✅' },
  ];

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
