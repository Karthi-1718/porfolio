import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  socialLinks = [
    { label: 'GitHub', href: 'https://github.com/karthikeyan', icon: 'github' }, // Replace with actual URL
    { label: 'LinkedIn', href: 'https://linkedin.com/in/karthikeyan', icon: 'linkedin' }, // Replace with actual URL
    { label: 'Email', href: 'mailto:karthikeyan@example.com', icon: 'mail' }, // Replace with actual email
  ];

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollTo(href: string): void {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
