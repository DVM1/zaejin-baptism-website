import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, OnDestroy, inject, ChangeDetectorRef, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './components/hero';
import { IntroComponent } from './components/intro';
import { EventDetailsComponent } from './components/event-details';
import { LocationComponent } from './components/location';
import { GalleryComponent } from './components/gallery';
import { RsvpComponent } from './components/rsvp';
import { DressCodeComponent } from './components/dress-code';
import { GodparentsComponent } from './components/godparents';
import { CONTENT } from './website-content';
import { WelcomeOverlayComponent } from './components/welcome-overlay';
import { WorldEffectsService } from './services/world-effects.service';
import { PreloadService } from './services/preload.service';
import { MagicFairyComponent } from './components/magic-fairy';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeroComponent,
    IntroComponent,
    EventDetailsComponent,
    LocationComponent,
    GalleryComponent,
    RsvpComponent,
    DressCodeComponent,
    GodparentsComponent,
    WelcomeOverlayComponent,
    MagicFairyComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <!-- Preloader -->
    <div class="loading-screen" *ngIf="isLoading()" [class.fade-out]="!isLoading()">
      <div class="loader-content">
        <div class="wax-seal-loader">Z</div>
        <div class="loading-bar">
          <div class="progress"></div>
        </div>
        <p>Preparing the Celebration...</p>
      </div>
    </div>

    <app-welcome-overlay 
      *ngIf="!isLoading() && showWelcome()" 
      [name]="content.baby.name" 
      (enter)="handleEnter()">
    </app-welcome-overlay>

    <!-- Floating Balloons Container (Moved outside content to ensure visibility) -->
    <div class="balloons-container" *ngIf="!isLoading() && !showWelcome()">
      <div class="parallax-wrapper layer-slow">
        <div class="balloon-wrapper" *ngFor="let b of balloons" 
             [style.left.%]="b.left" 
             [style.animation-delay]="b.delay + 's'"
             [style.animation-duration]="b.duration + 's'">
          <div class="balloon" 
               [style.background-color]="b.color"
               [style.width.px]="b.size"
               [style.height.px]="b.size * 1.2"
               [style.--sway]="b.sway + 'px'">
            <div class="balloon-string" [style.--string-len]="b.stringLen + 'px'"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Falling Petals (CSS Based for Mobile Performance) -->
    <div class="petals-container" *ngIf="!isLoading() && !showWelcome()">
      <div class="parallax-wrapper layer-medium">
        <div class="petal" *ngFor="let p of petals" 
             [class]="'petal shape-' + p.shapeIndex"
             [style.left.%]="p.left"
             [style.animation-delay]="p.delay + 's'"
             [style.animation-duration]="p.duration + 's'"
             [style.width.px]="p.size"
             [style.height.px]="p.size"
             [style.--petal-color]="p.color"
             [style.--sway]="p.sway + 'px'">
        </div>
      </div>
    </div>

    <!-- Magic Fairies -->
    <ng-container *ngIf="!isLoading() && !showWelcome()">
      <app-magic-fairy 
        *ngFor="let color of ['#FFC1C3', '#DEC4EE', '#E9D581']; let i = index" 
        [themeColor]="color"
        [index]="i" />
    </ng-container>

    <div class="app-container" [class.hidden]="isLoading() || showWelcome()">
      <main>
        <app-hero />
        <app-intro />
        <app-gallery />
        <app-event-details />
        <app-location />
        <app-dress-code />
        <app-godparents />
        <app-rsvp id="rsvp" />
      </main>

      <footer>
        <p>With Love, Maquiling Family</p>
      </footer>
    </div>
  `,
  styles: [`
    :host { display: block; }
    
    .app-container {
      overflow-x: hidden;
      position: relative;
    }

    .loading-screen {
      position: fixed; inset: 0;
      background: #FFFBF0;
      z-index: 10000;
      display: flex; justify-content: center; align-items: center;
      transition: opacity 0.8s ease-in-out;
    }
    
    .loading-screen.fade-out {
      opacity: 0;
      pointer-events: none;
    }
    
    .loader-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2.5rem;
    }

    .wax-seal-loader {
      position: relative;
      width: 80px; 
      height: 80px;
      background: radial-gradient(circle at 30% 30%, #D32F2F, #B71C1C);
      border-radius: 50%;
      box-shadow: 0 4px 6px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #790e0e;
      font-family: var(--font-heading);
      font-size: 2.5rem;
      border: 2px solid #8E1515;
    }

    .loading-bar {
      width: 150px;
      height: 2px;
      background: rgba(141, 110, 99, 0.2);
      border-radius: 2px;
      overflow: hidden;
    }

    .progress {
      width: 100%;
      height: 100%;
      background: #8D6E63;
      transform-origin: left;
      animation: progressLoad 2s ease-in-out infinite;
    }

    .loader-content p {
      font-family: var(--font-subheading, serif);
      color: #8D6E63;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-size: 0.8rem;
      opacity: 0.8;
      animation: textFade 2s infinite alternate;
    }

    @keyframes progressLoad {
      0% { transform: scaleX(0); }
      50% { transform: scaleX(0.7); }
      100% { transform: scaleX(1); }
    }

    @keyframes textFade {
      from { opacity: 0.5; }
      to { opacity: 1; }
    }
    
  `]
})
export class App implements OnInit, OnDestroy {
  content = CONTENT;
  showWelcome = signal(true);
  isLoading = signal(true);
  gardenOpacity = signal(0);
  isMobile = window.innerWidth <= 768;

  private effectsService = inject(WorldEffectsService);
  private preloadService = inject(PreloadService);
  private cdr = inject(ChangeDetectorRef);

  balloons: any[] = [];
  petals: any[] = [];

  @HostListener('window:scroll')
  onScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    document.documentElement.style.setProperty('--scroll-y', scrollY + 'px');
  }

  async ngOnInit() {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    this.lockScroll();

    await this.preloadService.preloadAll();

    // Optimized animation counts for better performance
    // Desktop: 10 balloons, 20 petals
    // Mobile: 5 balloons, 10 petals
    this.isMobile = window.innerWidth <= 768;
    this.balloons = this.effectsService.generateBalloons(this.isMobile ? 5 : 10);
    this.petals = this.effectsService.generatePetals(this.isMobile ? 10 : 20);

    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }

  handleEnter() {
    this.showWelcome.set(false);
    this.unlockScroll();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private lockScroll() {
    document.documentElement.classList.add('no-scroll');
    document.body.classList.add('no-scroll');
  }

  private unlockScroll() {
    document.documentElement.classList.remove('no-scroll');
    document.body.classList.remove('no-scroll');
  }

  ngOnDestroy() {
    // Proper cleanup to prevent memory leaks
    this.balloons = [];
    this.petals = [];
  }
}
