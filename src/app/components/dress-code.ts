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
              <div class="color-swatch" [style.background-color]="color.hex"></div>
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
      padding: 4rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 0;
      margin: 0 auto;
      width: 100%;
      background: transparent !important;

      @media(max-width: 900px) {
        padding: 2.5rem 1.5rem;
        margin: 1rem 10px;
        width: calc(100% - 20px);
      }
    }

    .section-subtitle {
      font-size: var(--font-size-subtitle);
      color: var(--color-primary-dark);
      margin-bottom: 0.5rem;
      margin-top: calc(-1 * var(--spacing-component));
    }

    .section-description {
      font-size: var(--font-size-body);
      line-height: 1.8;
      color: var(--color-text-light);
      margin-bottom: 3rem;
      max-width: 600px;
    }

    .subsection-title {
      font-family: var(--font-subheading);
      font-size: var(--font-size-h3);
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
      justify-content: center; /* Key for centering the bottom 2 */
      gap: 1.5rem;
      width: 100%;
      max-width: 600px; 
      margin: 0 auto;
    }

    .swatch-item {
      /* Force 3 items per row: (100% / 3) - gap allowance */
      flex: 0 0 calc(33.333% - 1rem); 
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.6rem;
    }

    /* Desktop: 5 in a row */
    @media (min-width: 768px) {
      .swatches-grid {
        max-width: 1000px;
      }
      .swatch-item {
        flex: 0 0 calc(20% - 1.2rem);
      }
    }

    .swatch-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.6rem;
    }

    .color-swatch {
      width: 65px; /* Reduced from 80px */
      height: 65px;
      border-radius: 0;
      box-shadow: var(--shadow-sm);
      border: 2px solid white;
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .color-name {
      font-family: var(--font-secondary);
      font-size: 1.1rem;
      color: var(--color-text);
      font-weight: 500;
    }

    /* Guidelines Styles */
    .guidelines-container {
      display: flex;
      flex-wrap: wrap; /* Intelligent stacking without @media */
      gap: 2.5rem;
      width: 100%;
      max-width: 850px;
      justify-content: center;
    }

    .vertical-divider {
      display: none; /* Hide divider to allow clean wrapping */
    }

    .guide-column {
      flex: 1 1 320px; /* Min-width forces stack on mobile, side-by-side on desktop */
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
        font-size: var(--font-size-subtitle);
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
        border-radius: 0;
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
        font-family: var(--font-body);
        font-size: var(--font-size-label);
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

  `]
})
export class DressCodeComponent {
  content = CONTENT;
}
