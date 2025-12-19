import { Component, signal, computed, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { CONTENT } from '../website-content';

@Pipe({ name: 'safeUrl', standalone: true })
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  template: `
    <section class="location-tabbed-section container">
      <div class="content-wrapper">
        <h2 class="section-title">Getting There</h2>

        <!-- Tab Switcher -->
        <div class="tabs-container">
          <button class="tab-btn" [class.active]="activeTab() === 'Ceremony'" (click)="setActiveTab('Ceremony')">
            Ceremony
          </button>
          <button class="tab-btn" [class.active]="activeTab() === 'Reception'" (click)="setActiveTab('Reception')">
            Reception
          </button>
        </div>

        <!-- All Venue Cards -->
        <div class="cards-container">
          <div class="single-card-container" *ngFor="let loc of locations()" [class.active]="loc.type === activeTab()"
            [class.inactive]="loc.type !== activeTab()">
            <div class="venue-card glass-card">

              <!-- 1. Header -->
              <div class="card-header">
                <div class="icon-circle">{{ loc.icon }}</div>
                <div class="header-text">
                  <h3>{{ loc.name }}</h3>
                </div>
              </div>

              <!-- 2. Venue Image -->
              <div class="venue-image">
                <img [src]="loc.image" alt="Venue Photo" loading="lazy">
              </div>



              <!-- 3. Map Preview -->
              <div class="map-preview">
                <iframe [src]="loc.mapUrl | safeUrl" width="100%" height="100%" style="border:0;" scrolling="no"
                  marginheight="0" marginwidth="0" allowfullscreen="" loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade">
                </iframe>
              </div>

              <!-- 4. Get Directions Button -->
              <div class="directions-btn-container">
                <a [href]="loc.directionLink" target="_blank" class="btn-directions">
                  <span class="btn-icon">🗺️</span>
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .location-tabbed-section {
      padding: var(--spacing-section) 2rem;
      background-color: var(--color-bg); 
      border-radius: 30px; 
      margin: 2rem auto 4rem;
      max-width: 1200px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      box-shadow: var(--shadow-sm);
    }

    /* Mobile: Remove container box look, keep padding/content */
    @media (max-width: 768px) {
      .location-tabbed-section {
        margin: 0;
        border-radius: 0;
        border: none;
        box-shadow: none;
        background: transparent; /* Or var(--color-bg) if needed, but 'no box' implies transparency or full width */
        padding: 4rem 1rem; /* Adjust padding */
        width: 100%;
      }
      
      .cards-container {
        padding: 0;
      }

      .venue-card {
        background: transparent !important;
        box-shadow: none !important;
        border: none !important;
        border-radius: 0 !important;
        backdrop-filter: none !important;
      }
      
      /* Reduce internal padding since there is no card border anymore */
      .card-header, .venue-image, .map-preview, .directions-btn-container {
        padding-left: 0 !important;
        padding-right: 0 !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      
      .venue-image, .directions-btn-container {
         padding-bottom: 1.5rem !important;
      }
      
      .map-preview {
         margin-bottom: 2rem !important;
      }
    }

    .content-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    /* Tabs Toggle Styling */
    .tabs-container {
      display: flex;
      background: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(10px);
      padding: 0.5rem;
      border-radius: 0; /* Square corners */
      margin-bottom: 3rem;
      box-shadow: var(--shadow-sm);
      border: 1px solid rgba(255, 255, 255, 0.8);
    }

    .tab-btn {
      padding: 0.8rem 2rem;
      border-radius: 0; /* Square corners */
      border: none;
      background: transparent;
      color: var(--color-text-light);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: var(--font-primary);
      font-size: 1rem;

      &.active {
        background: var(--color-primary);
        color: white;
        box-shadow: 0 4px 15px rgba(255, 127, 127, 0.3);
      }

      &:hover:not(.active) {
        background: rgba(255, 255, 255, 0.8);
        color: var(--color-primary);
      }
    }

    .cards-container {
      position: relative;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
    }

    .single-card-container {
      width: 100%;
      animation: fadeIn 0.5s ease-out;

      &.inactive { display: none; }
      &.active { display: block; }
    }

    .venue-card {
      /* Removed conflicting bg/border/shadow - handled by .glass-card */
      border-radius: 0; /* Square corners */
      overflow: hidden;
    }

    .card-header {
      padding: 2rem 2rem 1rem;
      display: flex;
      align-items: center;
      gap: 1.2rem;

      .icon-circle {
        width: 56px;
        height: 56px;
        background: var(--color-bg);
        border-radius: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.8rem;
        box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.05);
        color: var(--color-primary);
      }

      .header-text {
        h3 {
          font-size: 1.25rem;
          margin: 0;
          color: var(--color-text);
          font-family: var(--font-secondary);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.3;
        }

        .venue-type {
          font-size: 0.85rem;
          color: var(--color-text-light);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
      }
    }

    .venue-image {
      width: 100%;
      height: 250px;
      padding: 0 1.5rem;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 16px;
        box-shadow: var(--shadow-sm);
      }
    }

    .map-preview {
      margin: 1.5rem; /* added margin top for spacing since address is gone */
      aspect-ratio: 16 / 9;
      border-radius: 16px;
      overflow: hidden;
      background: #f0f0f0;
      border: 1px solid rgba(0, 0, 0, 0.05);

      iframe { display: block; height: 100%; }
    }

    .directions-btn-container {
      padding: 0 1.5rem 2rem;

      .btn-directions {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        width: 100%;
        padding: 1rem;
        background: var(--color-primary);
        color: white;
        text-decoration: none;
        border-radius: 50px;
        font-weight: 600;
        font-size: 1rem;
        transition: all 0.3s ease;
        box-shadow: var(--shadow-sm);

        &:hover {
          background: var(--color-highlight);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 640px) {
      .card-header { padding: 1.5rem 1.5rem 0.5rem; }
    }
  `]
})
export class LocationComponent {
  // Use signals for reactive state
  activeTab = signal<'Ceremony' | 'Reception'>('Ceremony');
  locations = signal(CONTENT.venues);

  setActiveTab(tab: 'Ceremony' | 'Reception') {
    this.activeTab.set(tab);
  }
}
