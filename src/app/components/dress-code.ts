import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTENT } from '../website-content';

@Component({
  selector: 'app-dress-code',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="dress-code-section container">
      <div class="content-wrapper glass-card">
        <h2 class="section-title text-heading">{{ content.dressCode.title }}</h2>
        <p class="section-subtitle text-subheading">{{ content.dressCode.subtitle }}</p>
        <p class="section-description text-body">{{ content.dressCode.description }}</p>

        <!-- Color Palette Display -->
        <div class="palette-container">
          <h3 class="subsection-title">Color Palette</h3>
          <div class="swatches-grid">
            <div class="swatch-item" *ngFor="let color of content.dressCode.palette">
              <div class="color-circle" [style.background-color]="color.hex"></div>
              <span class="color-name">{{ color.name }}</span>
            </div>
          </div>
        </div>

        <!-- Guidelines (Dos & Donts) -->
        <div class="guidelines-container">
          <!-- Dos -->
          <div class="guide-column">
            <div class="guide-header check">
              <span class="icon">✓</span>
              <h4>Please Wear</h4>
            </div>
            <ul class="guide-list">
              <li *ngFor="let item of content.dressCode.dos">{{ item }}</li>
            </ul>
          </div>

          <!-- Divider -->
          <div class="vertical-divider"></div>

          <!-- Donts -->
          <div class="guide-column">
            <div class="guide-header cross">
              <span class="icon">✕</span>
              <h4>Please Avoid</h4>
            </div>
            <ul class="guide-list">
              <li *ngFor="let item of content.dressCode.donts">{{ item }}</li>
            </ul>
          </div>
        </div>

        <p class="note text-body">
          <span class="note-icon">❦</span>
          {{ content.dressCode.note }}
        </p>
      </div>
    </section>
  `,
  styles: [`
    .dress-code-section {
      padding: var(--spacing-section) 0;
    }

    .content-wrapper {
      padding: 4rem 2rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .section-subtitle {
      font-size: 1.5rem;
      color: var(--color-primary-dark);
      margin-bottom: 0.5rem;
      margin-top: -2rem;
    }

    .section-description {
      font-size: 1.4rem; /* Increased for better readability */
      line-height: 1.8;
      color: var(--color-text-light);
      margin-bottom: 3rem;
      max-width: 600px;
    }

    .subsection-title {
      font-family: var(--font-subheading);
      font-size: 1.6rem; /* Increased from 1.25rem */
      color: var(--color-text);
      margin-bottom: 1.5rem;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    /* Color Palette Styles */
    .palette-container {
      margin-bottom: 4rem;
      width: 100%;
    }

    .swatches-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 2rem;
    }

    .swatch-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.8rem;
    }

    .color-circle {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      box-shadow: var(--shadow-sm);
      border: 3px solid white;
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

      &:hover {
        transform: scale(1.1);
        box-shadow: var(--shadow-md);
      }
    }

    .color-name {
      font-family: var(--font-secondary);
      font-size: 1.25rem; /* Increased further from 1.1rem */
      color: var(--color-text);
      font-weight: 500;
    }

    /* Guidelines Styles */
    .guidelines-container {
      display: flex;
      gap: 3rem;
      width: 100%;
      max-width: 800px;
      justify-content: center;
      margin-bottom: 2rem;
      background: rgba(255,255,255,0.5);
      padding: 2rem;
      border-radius: 20px;
    }

    .vertical-divider {
      width: 1px;
      background: rgba(0,0,0,0.1);
      align-self: stretch;
    }

    .guide-column {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .guide-header {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      margin-bottom: 1.5rem;

      h4 {
        font-family: var(--font-subheading);
        font-size: 1.5rem; /* Increased from 1.2rem */
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        color: white;
        font-size: 1rem;
        font-weight: bold;
      }
    }

    /* Green Check Header */
    .guide-header.check {
      .icon { background: #A8C3A8; }
      h4 { color: #5D7A5D; }
    }

    /* Red Cross Header */
    .guide-header.cross {
      .icon { background: #E57373; }
      h4 { color: #D32F2F; }
    }

    .guide-list {
      list-style: none;
      
      li {
        margin-bottom: 0.8rem;
        font-family: var(--font-body);
        font-size: 1.3rem; /* Increased from 1.1rem */
        color: var(--color-text);
      }
    }

    .note {
      font-style: italic;
      color: var(--color-text-light);
      margin-top: 2rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      .note-icon {
        color: var(--color-gold);
        font-size: 1.2rem;
      }
    }

    @media (max-width: 768px) {
      .guidelines-container {
        flex-direction: column;
        gap: 2rem;
      }

      .vertical-divider {
        width: 100%;
        height: 1px;
      }
      
      .swatches-grid {
        gap: 1.5rem;
      }
      
      .color-circle {
        width: 60px;
        height: 60px;
      }
    }
  `]
})
export class DressCodeComponent {
  content = CONTENT;
}
