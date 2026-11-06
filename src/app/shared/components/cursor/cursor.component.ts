import { Component, OnInit, OnDestroy, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cursor',
  standalone: true,
  template: `
    <div class="cursor-dot" [style.left.px]="x" [style.top.px]="y"></div>
    <div class="cursor-ring" [style.left.px]="rx" [style.top.px]="ry" [class.scale-150]="isHovering"></div>
  `,
  styles: [`
    :host { pointer-events: none; }
    .cursor-dot {
      position: fixed;
      width: 8px;
      height: 8px;
      background: #3b82f6;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: transform 0.1s ease;
    }
    .cursor-ring {
      position: fixed;
      width: 36px;
      height: 36px;
      border: 1.5px solid rgba(59, 130, 246, 0.6);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      transition: left 0.12s ease, top 0.12s ease, transform 0.2s ease;
    }
    .cursor-ring.scale-150 {
      transform: translate(-50%, -50%) scale(1.5);
      border-color: rgba(124, 58, 237, 0.8);
    }
    @media (max-width: 768px) {
      .cursor-dot, .cursor-ring { display: none; }
    }
  `]
})
export class CursorComponent implements OnInit, OnDestroy {
  x = -100; y = -100;
  rx = -100; ry = -100;
  isHovering = false;
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      document.addEventListener('mousemove', this.onMove);
      document.addEventListener('mouseover', this.onOver);
      document.addEventListener('mouseout', this.onOut);
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      document.removeEventListener('mousemove', this.onMove);
      document.removeEventListener('mouseover', this.onOver);
      document.removeEventListener('mouseout', this.onOut);
    }
  }

  private onMove = (e: MouseEvent) => {
    this.x = e.clientX;
    this.y = e.clientY;
    setTimeout(() => { this.rx = e.clientX; this.ry = e.clientY; }, 60);
  };

  private onOver = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    this.isHovering = !!(target.closest('a, button, [role="button"], .project-card'));
  };

  private onOut = () => { this.isHovering = false; };
}
