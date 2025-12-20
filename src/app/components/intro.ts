import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTENT } from '../website-content';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [CommonModule],
  template: `
  <section class="intro-section container">
    <div class="magazine-layout">

      <!-- Left / Top: Image Feature -->
      <div class="image-container" [style.transform]="'translateY(' + photoOffset() + 'px)'">
        <div class="photo-frame">
          <img [src]="content.baby.photoUrl" alt="Baby Zaejin" class="baby-photo">
          <div class="photo-decoration"></div>
        </div>
        <div class="floating-text-bg" [style.transform]="'translate(-50%, -50%) rotate(-90deg) translateY(' + bgOffset() + 'px)'">
          STAR
        </div>
      </div>

      <!-- Right / Bottom: Editorial Content -->
      <div class="text-content" [style.transform]="'translateY(' + textOffset() + 'px)'">
        <div class="editorial-header">
          <span class="eyebrow"> Our Guiding Light </span>
          <h2 class="headline"> {{ content.intro.title }}</h2>
        </div>

        <div class="story-block">
          <p class="drop-cap-paragraph">
            {{ content.intro.message }}
          </p>
        </div>

        <div class="verse-block">
          <span class="quote-mark">“</span>
          <p class="verse-text"> {{ content.intro.verse }}</p>
          <span class="verse-ref"> {{ content.intro.verseReference }}</span>
        </div>

        <div class="signature">
          <p>With Love, </p>
          <p class="family-name"> The Maquiling Family </p>
        </div>
      </div>

    </div>
  </section>
  `,
  styles: [`
    :host {
      display: block;
      overflow: hidden;
    }

    .intro-section {
      padding: var(--spacing-section) 0;
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
    }

    .magazine-layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
      position: relative;
      padding: 4rem;
      width: 100%;
      margin: 2rem auto;
      background: transparent !important; /* Force transparency */

      @media(max-width: 900px) {
        grid-template-columns: 1fr;
        gap: 3rem;
        text-align: center;
        padding: 2.5rem 1.5rem; /* Better mobile padding */
        margin: 1rem 10px;
        width: calc(100% - 20px);
      }
    }

    .image-container {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      will-change: transform;
    }

    .photo-frame {
      position: relative;
      width: 100%;
      max-width: 400px;
      aspect-ratio: 3 / 4;
      z-index: 2;
      border-radius: 2px;
      overflow: hidden;
      box-shadow: 20px 20px 60px rgba(0, 0, 0, 0.1), -5px -5px 20px rgba(255, 255, 255, 0.8);
      background: white;
      padding: 0.5rem;
      transform: rotate(-2deg);
      transition: transform 0.5s ease;

      &:hover {
        transform: rotate(0deg) scale(1.02);
      }
    }

    .baby-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      filter: contrast(1.05) saturate(1.05);
    }

    .floating-text-bg {
      position: absolute;
      top: 50%;
      left: 50%;
      font-family: var(--font-heading);
      font-size: 15rem;
      color: var(--color-gold);
      opacity: 0.08;
      z-index: 0;
      pointer-events: none;
      white-space: nowrap;
      will-change: transform;

      @media(max-width: 900px) {
        font-size: 10rem;
      }
    }

    .text-content {
      position: relative;
      z-index: 5;
      max-width: 600px;
      margin: 0 auto;
      will-change: transform;
    }

    .editorial-header {
      margin-bottom: 2.5rem;
    }

    .eyebrow {
      display: block;
      font-family: var(--font-ui);
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.2rem;
      color: var(--color-text-light);
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .headline {
      font-family: var(--font-subheading);
      font-size: 3.5rem;
      line-height: 1.1;
      color: var(--color-primary-dark);
      font-weight: 400;

      @media(max-width: 768px) {
        font-size: 2.8rem;
      }
    }

    .verse-block {
      position: relative;
      margin: 2rem 0;
      padding-left: 2rem;
      border-left: 2px solid var(--color-gold);

      @media(max-width: 900px) {
        padding-left: 0;
        border-left: none;
        border-top: 2px solid var(--color-gold);
        padding-top: 1.5rem;
      }
    }

    .quote-mark {
      position: absolute;
      top: -1.5rem;
      left: 0.5rem;
      font-family: var(--font-heading);
      font-size: 4rem;
      color: var(--color-gold);
      opacity: 0.2;
      line-height: 1;

      @media(max-width: 900px) {
        left: 50%;
        transform: translateX(-50%);
        top: -1rem;
      }
    }

    .verse-text {
      font-family: var(--font-body);
      font-style: italic;
      font-size: 1.4rem;
      line-height: 1.6;
      color: var(--color-text);
      margin-bottom: 0.5rem;
    }

    .verse-ref {
      display: block;
      font-family: var(--font-ui);
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--color-text-light);
      font-weight: 600;
    }

    .story-block {
      font-family: var(--font-body);
      font-size: 1.25rem;
      line-height: 1.8;
      color: var(--color-text);
      margin-bottom: 2rem;
    }

    .drop-cap-paragraph::first-letter {
      float: left;
      font-family: var(--font-heading);
      font-size: 5rem;
      line-height: 0.7;
      padding-right: 0.8rem;
      color: var(--color-primary);
      margin-top: 0.2rem;

      @media(max-width: 768px) {
        font-size: 4rem;
        line-height: 0.8;
      }
    }

    .signature {
      font-family: var(--font-heading);
      font-size: 1.8rem;
      color: var(--color-primary-dark);
      transform: rotate(-2deg);
      opacity: 0.9;
      
      p { margin: 0; }
      .family-name { font-size: 2.2rem; margin-top: -0.5rem; }
    }
  `]
})
export class IntroComponent {
  content = CONTENT;

  photoOffset = signal(0);
  bgOffset = signal(0);
  textOffset = signal(0);

  @HostListener('window:scroll')
  onScroll() {
    const scrolled = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    const relativeScroll = scrolled - windowHeight;

    if (relativeScroll > -windowHeight && relativeScroll < windowHeight) {
      this.photoOffset.set(relativeScroll * -0.1);
      this.bgOffset.set(relativeScroll * 0.2);
      this.textOffset.set(relativeScroll * -0.05);
    }
  }
}
