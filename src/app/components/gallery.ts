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
      <div class="content-wrapper">
        <h2 class="section-title">Precious Milestones</h2>

        <swiper-container
          navigation="true"
          pagination="true"
          loop="true"
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
          breakpoints='{"640": {"slidesPerView": 2}, "1024": {"slidesPerView": 3}}'
        >
          <swiper-slide *ngFor="let photo of photos">
            <div class="photo-card glass-card">
              <img [src]="photo" loading="lazy" alt="Baby's Photo">
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
      padding: var(--spacing-section) 2rem;
      background: var(--color-bg);
      margin: 2rem auto 4rem;
      max-width: 1200px;
      border-radius: 0; /* Square corners */
      border: 1px solid rgba(255, 255, 255, 0.5);
      box-shadow: var(--shadow-sm);
    }
    
    .content-wrapper {
      /* Optional alignment if needed, but Swiper handles most */
      width: 100%;
      text-align: center;
    }

    swiper-container {
      width: 100%;
      padding-bottom: 50px;
    }

    swiper-slide {
      background-position: center;
      background-size: cover;
      width: 300px;
      transition: transform 0.3s;
    }

    .photo-card {
      /* Handled by glass-card */
      border-radius: 0; /* Square corners */
      overflow: hidden;
      padding: 10px;

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

    @media (max-width: 768px) {
      .gallery-section {
        border-radius: 0 !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
        width: 100% !important;
        border: none !important;
      }
    }
  `]
})
export class GalleryComponent implements OnInit {
  photos = CONTENT.gallery;

  ngOnInit() {
    register();
  }
}
