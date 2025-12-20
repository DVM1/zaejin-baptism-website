import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTENT } from '../website-content';

@Component({
  selector: 'app-godparents',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="godparents-section container">
      <div class="content-wrapper glass-card">
        <h2 class="section-title text-heading">Godparents</h2>
        <!-- Subtitle removed as requested -->
        
        <div class="godparents-container">
          <div class="godparent-item" *ngFor="let gp of content.godparents">
            <h3 class="name">{{ gp.name }}</h3>
            <p class="role">{{ gp.role }}</p>
          </div>
        </div>

        <p class="appreciation-text">
          "Train up a child in the way he should go: and when he is old, he will not depart from it."
          <br>— Proverbs 22:6
        </p>
      </div>
    </section>
  `,
  styles: [`
    .godparents-section {
      padding: var(--spacing-section) 0;
    }

    .content-wrapper {
        padding: 4rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;
        width: 100%;
        background: transparent !important;

        @media(max-width: 900px) {
          padding: 2.5rem 1.5rem;
          margin: 1rem 10px;
          width: calc(100% - 20px);
        }
    }

    /* Responsive Layout Logic */
    .godparents-container {
      width: 100%;
      max-width: 800px;
      margin-bottom: 3rem;
      margin-top: 1rem;
      
      display: grid;
      grid-template-columns: 1fr; /* Mobile: Single column list */
      gap: 1.5rem;
    }

    .godparent-item {
      display: flex;
      flex-direction: column; /* Role below name */
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid rgba(0,0,0,0.05); /* Subtle separator */
      
      &:last-child {
        border-bottom: none;
      }
    }

    .name {
      font-family: var(--font-subheading);
      font-size: 1.3rem;
      color: var(--color-primary-dark);
      margin: 0 0 0.3rem 0;
      font-weight: 600;
    }

    .role {
      font-family: var(--font-body);
      font-size: 1rem;
      color: var(--color-text-light);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 0;
    }

    /* Tablet & Desktop: 2 Columns for better space usage, still list-like */
    @media (min-width: 600px) {
      .godparents-container {
        grid-template-columns: repeat(2, 1fr);
        column-gap: 4rem; /* Wide gap between columns */
      }
      
      .godparent-item {
        align-items: flex-start; /* Left align on desktop/grid */
        text-align: left;
        border-bottom: 1px solid rgba(0,0,0,0.05);
      }
    }

    .appreciation-text {
      font-family: var(--font-secondary);
      font-size: 1.1rem;
      font-style: italic;
      color: var(--color-text);
      max-width: 600px;
      line-height: 1.6;
    }
  `]
})
export class GodparentsComponent {
  content = CONTENT;
}
