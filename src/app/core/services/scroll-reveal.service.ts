import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ScrollRevealService {
  private observer: IntersectionObserver | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  init(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const delay = target.dataset['delay'] ?? '0';
            setTimeout(() => {
              target.classList.add('visible');
            }, parseInt(delay, 10));
            this.observer?.unobserve(target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    this.observeElements();
  }

  observeElements(): void {
    if (!this.observer) return;
    const selectors = ['.reveal-up', '.reveal-left', '.reveal-right'];
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => this.observer!.observe(el));
    });
  }

  destroy(): void {
    this.observer?.disconnect();
  }
}
