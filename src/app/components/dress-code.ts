import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTENT } from '../website-content';

@Component({
  selector: 'app-dress-code',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="dress-code-section container">
      <div class="content-wrapper">
        <h2 class="section-title">{{ content.dressCode.title }}</h2>
        <p class="section-subtitle">{{ content.dressCode.subtitle }}</p>
        <p class="section-description">{{ content.dressCode.description }}</p>

        <!-- Category Cards -->
        <div class="categories-grid">
          <div class="category-card glass-card" *ngFor="let category of content.dressCode.categories">
            <div class="category-icon">{{ category.icon }}</div>
            <h3 class="category-title">{{ category.title }}</h3>
            <ul class="suggestions-list">
              <li *ngFor="let suggestion of category.suggestions">
                <span class="bullet">✓</span>
                {{ suggestion }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Color Palette Guide -->
        <div class="color-guide glass-card">
          <div class="color-section">
            <h4>
              <span class="icon">🎨</span>
              Recommended Colors
            </h4>
            <div class="color-tags">
              <span class="color-tag preferred" *ngFor="let color of content.dressCode.colors.preferred">
                {{ color }}
              </span>
            </div>
          </div>
          <div class="color-section">
            <h4>
              <span class="icon">⚠️</span>
              Please Avoid
            </h4>
            <div class="color-tags">
              <span class="color-tag avoid" *ngFor="let color of content.dressCode.colors.avoid">
                {{ color }}
              </span>
            </div>
          </div>
        </div>

        <!-- Additional Note -->
        <p class="note">
          <span class="note-icon">💡</span>
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
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .section-subtitle {
      font-size: 1.5rem;
      font-family: var(--font-primary);
      color: var(--color-secondary);
      margin-bottom: 0.5rem;
      margin-top: -2rem; 
    }

    .section-description {
      color: var(--color-text-light);
      margin-bottom: 3rem;
      max-width: 600px;
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
      width: 100%;
    }

    .glass-card {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 0; /* Square corners */
      box-shadow: var(--shadow-sm);
    }

    .category-card {
      padding: 2rem;
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-md);
      }

      .category-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
      }

      .category-title {
        color: var(--color-text);
        margin-bottom: 1.5rem;
        font-size: 1.25rem;
      }

      .suggestions-list {
        text-align: left;
        padding-left: 1rem;
        
        li {
          margin-bottom: 0.5rem;
          color: var(--color-text-light);
          display: flex;
          align-items: center;
          gap: 0.5rem;

          .bullet {
            color: var(--color-primary);
            font-weight: bold;
          }
        }
      }
    }

    .color-guide {
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
      padding: 2rem;
      justify-content: space-around;
      margin-bottom: 3rem;
      width: 100%;
    }

    .color-section {
      h4 {
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-size: 1.1rem;
      }
    }

    .color-tags {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.8rem;
    }

    .color-tag {
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
      
      &.preferred {
        background: var(--color-bg);
        color: var(--color-text);
        border: 1px solid var(--color-primary);
      }

      &.avoid {
        background: #f5f5f5;
        color: var(--color-text-light);
        text-decoration: line-through;
      }
    }

    .note {
      font-style: italic;
      color: var(--color-text-light);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 2rem;
      padding: 0 1rem; /* Added padding for mobile view */
      text-align: center;
    }

    @media (max-width: 768px) {
      .color-guide {
        flex-direction: column;
      }
    }
  `]
})
export class DressCodeComponent {
  content = CONTENT;
}
