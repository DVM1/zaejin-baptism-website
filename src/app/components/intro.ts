import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTENT } from '../website-content';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="intro-section container">
      <div class="intro-card glass-card">
        <div class="photo-frame">
           <!-- Using baby photo from content -->
           <img [src]="content.baby.photoUrl" alt="Baby Photo" class="baby-photo">
        </div>
        
        <div class="message">
          <h2 class="section-title">{{ content.intro.title }}</h2>
          <p class="verse">
            {{ content.intro.verse }}
            <span>{{ content.intro.verseReference }}</span>
          </p>
          <p class="body-text">
            {{ content.intro.message }}
          </p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .intro-section {
      padding: var(--spacing-section) 0;
      display: flex;
      justify-content: center;
      /* Background handled by global app container now (balloons/sparkles) */
    }

    .intro-card {
      display: flex;
      align-items: center;
      gap: 3rem;
      /* Extended glass-card style handled by class */
      padding: 3rem;
      border-radius: 0; /* Square corners */
    }

    .glass-card {
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      box-shadow: var(--shadow-lg);
    }

    .photo-frame {
      flex-shrink: 0;
      width: 280px;
      height: 380px;
      /* Arch shape */
      border-radius: 200px 200px 20px 20px;
      overflow: hidden;
      border: 6px solid white;
      box-shadow: var(--shadow-md);
      position: relative;

      .baby-photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.8s ease;
      }

      &:hover .baby-photo {
        transform: scale(1.05);
      }
    }

    .message {
      flex: 1;

      .section-title {
        text-align: left;
        margin-bottom: 1.5rem;
        font-size: 2.5rem;
        color: var(--color-primary);
        
        &::after {
          content: '';
          display: block;
          width: 60px;
          height: 3px;
          background: var(--color-gold); 
          margin: 0.5rem 0 0;
        }
      }

      .verse {
        font-size: 1.15rem;
        color: var(--color-text-light);
        margin-bottom: 2rem;
        font-style: italic;
        font-family: var(--font-primary);
        border-left: 3px solid var(--color-secondary);
        padding-left: 1rem;

        span {
          display: block;
          margin-top: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-secondary);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-style: normal;
          font-family: var(--font-secondary);
        }
      }

      .body-text {
        font-size: 1.05rem;
        line-height: 1.8;
        color: var(--color-text);
      }
    }

    @media (max-width: 768px) {
      .intro-card {
        flex-direction: column;
        text-align: center;
        gap: 2rem;
        padding: 2rem;
      }

      .message .section-title {
        text-align: center;
        &::after { margin: 0.5rem auto 0; }
      }
      
      .message .verse {
        border-left: none;
        border-top: 3px solid var(--color-secondary);
        padding-top: 1rem;
        padding-left: 0;
      }
    }
  `]
})
export class IntroComponent {
  content = CONTENT;
}
