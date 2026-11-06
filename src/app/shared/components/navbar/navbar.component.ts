import { Component, OnInit, OnDestroy, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;
  activeSection = 'hero';
  isBrowser = false;

  navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isBrowser) return;
    this.isScrolled = window.scrollY > 50;
    this.updateActiveSection();
  }

  private updateActiveSection(): void {
    const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
    for (const id of sections.reverse()) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 150) {
        this.activeSection = id;
        break;
      }
    }
  }

  scrollTo(href: string): void {
    this.isMobileMenuOpen = false;
    if (!this.isBrowser) return;
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
