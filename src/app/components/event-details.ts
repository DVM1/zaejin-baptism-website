import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTENT } from '../website-content';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="details-section container">
      <div class="header-wrapper">
        <h2 class="section-title text-heading">Event Details</h2>
      </div>

      <div class="timeline-container">
        <!-- The Central Gold Thread -->
        <div class="central-line"></div>

        <!-- Event Items -->
        <div class="timeline-item" 
             *ngFor="let event of content.timeline; let i = index; let isOdd = odd"
             [class.odd]="isOdd"
             [class.even]="!isOdd">
          
          <!-- Time (Left or Right based on odd/even) -->
          <div class="time-col">
            <span class="time-text">{{ event.time }}</span>
          </div>

          <!-- The Magical Marker -->
          <div class="marker-col">
            <div class="flower-marker">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round">
                <!-- Golden Rose -->
                <defs>
                  <filter id="rose-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="rgba(212, 175, 55, 0.3)"/>
                  </filter>
                </defs>
                
                <!-- Leaf (Sage Green) -->
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#E8F5E9" opacity="0.4" transform="scale(0.8) translate(3,3)" />
                
                <!-- Golden Petals -->
                <path d="M12,4 C10,4 8,6 8,9 C8,11 10,13 12,13 C14,13 16,11 16,9 C16,6 14,4 12,4 Z" fill="#F4E4BC" stroke="#C5A059" stroke-width="0.8" filter="url(#rose-glow)" />
                <path d="M12,13 C10,13 7,12 6,10 C5,12 6,15 8,17 C10,19 14,19 16,17 C18,15 19,12 18,10 C17,12 14,13 12,13 Z" fill="#EEDCA8" stroke="#C5A059" stroke-width="0.8" filter="url(#rose-glow)" />
                <!-- Inner swirl details -->
                <path d="M12,6 C11,6 10,7 10,8 C10,9 11,10 12,10 C13,10 14,9 14,8 C14,7 13,6 12,6" fill="none" stroke="#B48E43" stroke-width="0.8" />
                
                <!-- Stem -->
                <path d="M12,20 L12,22 M12,17 L12,20" stroke="#8FBC8F" stroke-width="1.5" />
              </svg>
            </div>
          </div>

          <!-- Content Card (Right or Left based on odd/even) -->
          <div class="content-col">
            <div class="glass-card event-card">
              <h3>{{ event.title }}</h3>
              <p class="note" *ngIf="event.note">{{ event.note }}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .details-section {
      padding: var(--spacing-section) 0;
      position: relative;
    }

    .header-wrapper {
      text-align: center;
      margin-bottom: 3rem;
    }

    .section-subtitle {
      color: var(--color-primary);
      margin-top: -1rem;
    }

    .timeline-container {
      position: relative;
      max-width: 1000px;
      margin: 0 auto;
    }

    /* Central Gold Thread */
    .central-line {
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(180deg, 
        transparent 0%, 
        var(--color-gold) 15%, 
        var(--color-gold) 85%, 
        transparent 100%
      );
      transform: translateX(-50%);
      opacity: 0.6;
      /* Removed box-shadow as requested */
    }

    .timeline-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-bottom: 2rem;
      position: relative;
    }

    /* Columns Widths */
    .time-col, .content-col {
      width: 45%; 
      display: flex;
    }
    .marker-col {
      width: 10%;
      display: flex;
      justify-content: center;
      position: relative;
      z-index: 2;
    }

    /* Alternating Logic (Desktop & Tablet) */
    .timeline-item.even .time-col { justify-content: flex-end; padding-right: 2rem; }
    .timeline-item.even .content-col { justify-content: flex-start; padding-left: 2rem; }
    
    .timeline-item.odd { flex-direction: row-reverse; }
    .timeline-item.odd .time-col { justify-content: flex-start; padding-left: 2rem; }
    .timeline-item.odd .content-col { justify-content: flex-end; padding-right: 2rem; }

    /* Typography */
    .time-text {
      font-family: var(--font-subheading); /* Changed for readability */
      font-weight: 700;
      font-size: 1.5rem;
      color: var(--color-primary-dark);
      white-space: nowrap;
    }

    .event-card {
      width: 100%;
      text-align: left;
      padding: 1.5rem;
      border-radius: 12px;
      background: transparent !important;
      border: 1px solid rgba(255, 255, 255, 0.2) !important;
      backdrop-filter: none !important;
      box-shadow: none !important;

      h3 {
        font-family: var(--font-subheading);
        font-size: 1.4rem;
        color: var(--color-text);
        margin-bottom: 0.5rem;
      }

      .note {
        font-family: var(--font-body);
        font-size: 1.1rem;
        color: var(--color-text-light);
        font-style: italic;
      }
    }

    /* Marker Styling */
    /* Marker Styling */
    .flower-marker {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.4); /* Less intense */
      border: 1px solid var(--color-gold);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
      transition: transform 0.3s ease;
      /* Hover effect removed */

      svg {
        width: 24px;
        height: 24px;
        filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
      }
    }

    /* Responsive Mobile (Collapse only on small phones) */
    @media (max-width: 600px) {
      .central-line {
        left: 30px; /* Align line to left */
      }

      .timeline-item {
        flex-direction: column !important; /* Stack vertically */
        align-items: flex-start;
        margin-bottom: 3rem;
      }

      .marker-col {
        width: 60px; /* Fixed width for marker channel */
        justify-content: center;
        margin-bottom: 1rem;
        position: absolute; /* Take out of flow to align content better */
        left: 0;
        top: 0;
        height: 100%;
        align-items: flex-start; /* Marker at top */
      }

      .time-col {
        width: 100%;
        padding-left: 70px !important;
        padding-right: 0 !important;
        justify-content: flex-start !important;
        margin-bottom: 0.5rem;
      }

      .content-col {
        width: 100%;
        padding-left: 70px !important;
        padding-right: 0 !important;
        justify-content: flex-start !important;
      }

      .time-text {
        font-size: 1.5rem;
      }

      .event-card {
        padding: 1rem;
      }
      
      .flower-marker {
        margin-top: 5px; /* Visual alignment with time text */
      }
    }
  `]
})
export class EventDetailsComponent {
  content = CONTENT;
}
