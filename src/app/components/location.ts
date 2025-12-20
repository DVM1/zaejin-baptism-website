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
      <div class="location-container"> <!-- Container for responsive logic -->
        <div class="content-wrapper glass-card">
          <h2 class="section-title">Location Guide</h2>

          <!-- Tab Switcher - BACK TO TOP -->
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
            <!-- Active Check - only applied on mobile container -->
            <div class="single-card-container" *ngFor="let loc of locations()" 
                 [class.active-card]="loc.type === activeTab()">
              <div class="venue-card">
                <!-- Left Side: Information -->
                <div class="venue-info">
                  <div class="card-header">
                    <div class="icon-circle">{{ loc.icon }}</div>
                    <div class="header-text">
                      <h3>{{ loc.name }}</h3>
                    </div>
                  </div>
                  
                </div>

                <!-- Right Side: Visuals -->
                <div class="venue-visuals">
                  <div class="venue-image">
                    <img [src]="loc.image" alt="Venue Photo">
                  </div>
                  <div class="map-preview">
                    <iframe [src]="loc.mapUrl | safeUrl" width="100%" height="100%" style="border:0;" scrolling="no"
                      marginheight="0" marginwidth="0" allowfullscreen="" loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                  </div>
                  
                  <div class="directions-btn-container">
                    <a [href]="loc.directionLink" target="_blank" class="btn-primary directions-btn">
                      <span class="btn-icon">🗺️</span>
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .location-tabbed-section {
      margin: 0 auto;
      padding: var(--spacing-section) 0;
    }

    .location-container {
      container-type: inline-size;
      width: 100%;
    }

    .content-wrapper {
        padding: 4rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        border-radius: 0;
        margin: 0 auto;
        background: transparent !important;

        @media(max-width: 900px) {
          padding: 2.5rem 1.5rem;
          margin: 1rem 10px;
          width: calc(100% - 20px);
        }
    }

    .tabs-container {
      display: flex;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: none !important;
      padding: 0.5rem;
      border-radius: 0;
      box-shadow: none !important;
      border: 1px solid rgba(255, 255, 255, 0.3);
      margin-bottom: 2rem;
    }

    .tab-btn {
      padding: 0.8rem 2rem;
      border-radius: 0;
      border: none;
      background: transparent;
      color: var(--color-text-light);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: var(--font-primary);
      font-size: var(--font-size-label);

      &.active {
        background: var(--color-primary);
        color: white;
        box-shadow: 0 4px 15px rgba(255, 127, 127, 0.3);
      }
    }

    .cards-container {
      position: relative;
      width: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    /* Mobile First: Hide inactive, handle tabs */
    .single-card-container {
      display: none;
      width: 100%;
      animation: fadeIn 0.5s ease-out;
      
      &.active-card { display: block; }
    }

    /* HIGH WIDTH LOGIC (SIDE-BY-SIDE + NO TABS) */
    @container (min-width: 700px) {
      .tabs-container { display: none; }
      
      .cards-container {
        flex-direction: row;
        justify-content: center;
        align-items: stretch;
      }

      .single-card-container {
        display: block !important; /* Show both cards */
        flex: 1;
        max-width: 500px;
      }

      .venue-card {
        flex-direction: column !important; /* Stack info/visuals inside the half-width card */
        height: 100%;
        background: transparent !important;
        border: 1px solid rgba(255,255,255,0.2) !important;
        padding-bottom: 2rem;
        backdrop-filter: none !important;
      }
      
      .venue-info { flex: 0 0 auto !important; }
      .venue-visuals { flex: 1 1 auto; width: 100%; }
    }

    .venue-card {
      display: flex;
      flex-wrap: wrap; 
      width: 100%;
      justify-content: center;
      align-items: flex-start;
      border-radius: 0;
      overflow: hidden;
      padding: 0;
    }

    .venue-info {
      flex: 1 1 320px;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      text-align: center;
      align-items: center;
    }

    .venue-visuals {
      flex: 1 1 320px;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .card-header {
      padding: 1rem 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;

      .icon-circle {
        width: 56px;
        height: 56px;
        font-size: 2rem;
        color: var(--color-primary);
      }

      .header-text h3 {
        font-size: var(--font-size-h3);
        margin: 0;
        color: var(--color-text);
        font-family: var(--font-secondary);
      }
    }

    .venue-image {
      width: 100%;
      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        box-shadow: var(--shadow-sm);
      }
    }

    .map-preview {
      aspect-ratio: 16 / 9;
      background: #f0f0f0;
      border: 1px solid rgba(0, 0, 0, 0.05);
      iframe { display: block; height: 100%; }
    }

    .directions-btn-container {
      width: 100%;
      padding: 0 2rem;
      .directions-btn { width: 100%; }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class LocationComponent {
  activeTab = signal<'Ceremony' | 'Reception'>('Ceremony');
  locations = signal(CONTENT.venues);

  setActiveTab(tab: 'Ceremony' | 'Reception') {
    this.activeTab.set(tab);
  }
}
