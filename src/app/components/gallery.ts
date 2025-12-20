import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTENT } from '../website-content';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';

// register Swiper custom elements
register();

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <section class="gallery-section container">
      <div class="content-wrapper glass-card">
        <h2 class="section-title">Precious Milestones</h2>

        <swiper-container
          navigation="true"
          pagination="true"
          loop="false"
          autoplay-delay="3000"
          autoplay-disable-on-interaction="false"
          centered-slides="true"
          slides-per-view="1"
          effect="coverflow"
          coverflow-effect-rotate="0"
          coverflow-effect-stretch="0"
          coverflow-effect-depth="100"
          coverflow-effect-modifier="2.5"
          coverflow-effect-slide-shadows="false"
          breakpoints='{"640": {"slidesPerView": 2}, "1024": {"slidesPerView": 2}}'
        >
          <swiper-slide *ngFor="let photo of photos">
            <div class="photo-card glass-card">
              <img [src]="photo" alt="Baby's Photo">
            </div>
          </swiper-slide>
        </swiper-container>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .gallery-section {
      margin: 0 auto;
      padding: var(--spacing-section) 0;
    }
    
    .content-wrapper {
      padding: 4rem;
      width: 100%;
      text-align: center;
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

    swiper-container {
      width: 100%;
    }

    swiper-slide {
      background-position: center;
      background-size: cover;
      width: 300px;
      transition: transform 0.3s;
    }

    .photo-card {
      border-radius: 0;
      overflow: hidden;
      padding: 0;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      backdrop-filter: none !important;

      img {
        width: 100%;
        height: 400px;
        object-fit: cover;
        border-radius: 0; /* Square corners */
        display: block;
      }
    }

    :host {
      --swiper-theme-color: var(--color-accent);
      --swiper-navigation-size: 30px;
    }

  `]
})
export class GalleryComponent implements OnInit {
  photos = CONTENT.gallery;

  ngOnInit() {
  }
}
