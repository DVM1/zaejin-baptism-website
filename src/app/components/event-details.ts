import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTENT } from '../website-content';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="details-section container">
      <div class="content-wrapper">
        <h2 class="section-title">Event Details</h2>

        <div class="timeline">
          <div class="event-item" *ngFor="let event of content.timeline">
            <div class="time">{{ event.time }}</div>
            <!-- Marker is now a static flex item for better alignment -->
            <div class="marker-container">
               <div class="marker"></div>
            </div>
            <div class="content glass-card">
              <h3>{{ event.title }}</h3>
              <p class="venue" *ngIf="event.venue">{{ event.venue }}</p>
              <p class="address" *ngIf="event.address">{{ event.address }}</p>
              <p class="note" *ngIf="event.note">{{ event.note }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .details-section {
      padding: var(--spacing-section) 2rem; /* Added horizontal padding */
      background-color: var(--color-bg);
      margin: 2rem auto 4rem; /* Top/Bottom margins for separation */
      max-width: 1200px; /* Constrain width */
      border-radius: 0; /* Square corners */
      border: 1px solid rgba(255, 255, 255, 0.5); /* Subtle border */
      box-shadow: var(--shadow-sm); /* Subtle lift */
    }

    .content-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }

    .timeline {
      position: relative;
      max-width: 800px;
      margin: 0 auto;
      width: 100%;

      /* Vertical line */
      &::before {
        content: '';
        position: absolute;
        left: 140px; 
        width: 2px;
        height: 100%;
        background: var(--color-secondary);
        opacity: 0.3;
      }
    }

    .event-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 4rem;
      position: relative;
      z-index: 1;

      &:last-child {
        margin-bottom: 0;
      }

      .time {
        width: 120px;
        text-align: right;
        padding-right: 1.5rem;
        font-weight: 700;
        color: var(--color-primary-dark);
        font-family: var(--font-primary);
        font-size: 1.6rem; /* Increased from 1.2rem */
        flex-shrink: 0;
        padding-top: 0.5rem;
      }

      .marker-container {
        width: 40px;
        display: flex;
        justify-content: center;
        flex-shrink: 0;
        padding-top: 0.6rem;
      }

      .marker {
        width: 20px;
        height: 20px;
        background: var(--color-white);
        border: 4px solid var(--color-secondary);
        border-radius: 50%;
        box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.5);
      }

      .content {
        flex: 1;
        margin-left: 1.5rem;
        padding: 1.5rem;
        background: white; /* fallback */
        border-radius: 0; /* Square corners */
      }
      
      .glass-card {
         /* Keep glass styles if needed here or rely on global class */
         background: rgba(255, 255, 255, 0.9);
      }
      
      .content h3 {
          font-size: 1.8rem; /* Increased from 1.5rem */
          margin-bottom: 0.5rem;
          color: var(--color-secondary);
      }

      .content .venue {
          font-size: 1.3rem; /* Added explicit size */
          font-weight: 600;
          margin-bottom: 0.2rem;
          color: var(--color-text);
      }

      .content .address {
          font-size: 1.2rem; /* Further increased for readability */
          color: var(--color-text-light);
          margin-bottom: 0.5rem;
      }

      .content .note {
          font-size: 1.15rem; /* Further increased for readability */
          font-style: italic;
          color: var(--color-text-light);
      }
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .details-section {
         border-radius: 0 !important;
         margin-left: 0 !important;
         margin-right: 0 !important;
         width: 100% !important;
         border: none !important;
      }
      
      .timeline::before {
        left: 20px;
      }

      .event-item {
        flex-direction: column;
        align-items: flex-start;
        padding-left: 50px;

        .time {
          width: auto;
          text-align: left;
          padding: 0;
          margin-bottom: 0.5rem;
        }

        .marker-container {
          position: absolute;
          left: 0;
          width: 40px;
          top: 0;
        }

        .content {
          width: 100%;
          margin-left: 0;
          padding: 1.25rem;
        }
      }
    }
  `]
})
export class EventDetailsComponent {
  content = CONTENT;
}
