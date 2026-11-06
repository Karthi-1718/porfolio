import { Component, OnInit, OnDestroy, signal, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-screen" *ngIf="visible()">
      <div class="text-center">
        <div class="loading-logo mb-6">K.</div>
        <div class="text-xs tracking-widest text-slate-500 mb-6 uppercase">Loading Portfolio</div>
        <div class="w-48 h-px bg-slate-800 mx-auto rounded overflow-hidden">
          <div class="loading-bar-fill" [style.width.%]="progress()"></div>
        </div>
        <div class="mt-3 text-xs text-slate-600">{{ progress() | number:'1.0-0' }}%</div>
      </div>
    </div>
  `,
  styles: [`
    .loading-screen {
      position: fixed;
      inset: 0;
      background: #050508;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
    }
    .text-center { text-align: center; }
    .mb-6 { margin-bottom: 1.5rem; }
    .loading-logo {
      font-size: 3rem;
      font-weight: 900;
      letter-spacing: 4px;
      background: linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .text-xs { font-size: 0.75rem; }
    .tracking-widest { letter-spacing: 0.2em; }
    .text-slate-500 { color: #64748b; }
    .text-slate-600 { color: #475569; }
    .uppercase { text-transform: uppercase; }
    .w-48 { width: 12rem; }
    .h-px { height: 1px; }
    .bg-slate-800 { background-color: #1e293b; }
    .mx-auto { margin-left: auto; margin-right: auto; }
    .rounded { border-radius: 0.25rem; }
    .overflow-hidden { overflow: hidden; }
    .mt-3 { margin-top: 0.75rem; }
    .loading-bar-fill {
      height: 2px;
      background: linear-gradient(90deg, #3b82f6, #7c3aed);
      border-radius: 1px;
      transition: width 0.1s linear;
    }
  `]
})
export class LoadingComponent implements OnInit, OnDestroy {
  visible = signal(true);
  progress = signal(0);
  private interval: ReturnType<typeof setInterval> | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.interval = setInterval(() => {
      const current = this.progress();
      if (current < 90) {
        this.progress.set(Math.min(90, current + Math.random() * 15));
      }
    }, 150);

    setTimeout(() => {
      this.progress.set(100);
      setTimeout(() => {
        this.visible.set(false);
      }, 300);
    }, 1800);
  }

  ngOnDestroy(): void {
    if (this.interval) clearInterval(this.interval);
  }
}
