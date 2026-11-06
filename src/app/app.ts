import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CursorComponent } from './shared/components/cursor/cursor.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { ScrollRevealService } from './core/services/scroll-reveal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NavbarComponent,
    FooterComponent,
    CursorComponent,
    LoadingComponent,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading = signal(true);

  constructor(private scrollReveal: ScrollRevealService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
      setTimeout(() => {
        this.scrollReveal.init();
      }, 300);
    }, 2000);
  }

  ngOnDestroy(): void {
    this.scrollReveal.destroy();
  }
}
