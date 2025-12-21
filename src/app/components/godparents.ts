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
        
        <!-- Desktop & Tablet: Side by Side -->
        <div class="godparents-grid-layout desktop-only">
          <div class="column-title-group">
            <h3 class="column-header ninang">Ninang</h3>
            <h3 class="column-header ninong">Ninong</h3>
          </div>
          <div class="columns-container">
            <!-- Ninang Column -->
            <div class="column">
              <div class="godparent-item" *ngFor="let gp of ninangs">
                <h3 class="name">{{ gp.name }}</h3>
              </div>
            </div>
            <!-- Ninong Column -->
            <div class="column">
              <div class="godparent-item" *ngFor="let gp of ninongs">
                <h3 class="name">{{ gp.name }}</h3>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile: Alternating List -->
        <div class="mobile-only mobile-list">
          <div class="godparent-item" *ngFor="let gp of zippedGodparents">
            <span class="role-badge" [class]="gp.role.toLowerCase()">{{ gp.role }}</span>
            <h3 class="name">{{ gp.name }}</h3>
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

    .section-title {
      margin-bottom: 3rem;
    }

    /* Desktop/iPad Layout */
    .godparents-grid-layout {
      width: 100%;
      max-width: 900px;
      margin-bottom: 3rem;
      display: none; /* Hidden by default */
      
      @media (min-width: 600px) {
        display: block;
      }
    }

    .column-title-group {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      margin-bottom: 2rem;
      border-bottom: 1px solid rgba(180, 142, 67, 0.2);
    }

    .column-header {
      font-family: var(--font-secondary);
      font-size: 1.1rem;
      text-transform: uppercase;
      letter-spacing: 0.2rem;
      padding-bottom: 1rem;
      
      &.ninang { color: var(--color-primary-dark); }
      &.ninong { color: #5D4037; }
    }

    .columns-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
    }

    .column {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }

    /* Mobile Layout */
    .mobile-list {
      display: flex; /* Hidden on desktop via .mobile-only logic if needed, but we use flex here */
      flex-direction: column;
      width: 100%;
      margin-bottom: 3rem;

      @media (min-width: 600px) {
        display: none;
      }
    }

    .godparent-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.5rem;
      
      @media (min-width: 600px) {
        align-items: flex-start;
        text-align: left;
        padding: 0;
      }
    }

    .role-badge {
      font-family: var(--font-ui);
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 2px 8px;
      border-radius: 4px;
      margin-bottom: 4px;
      
      &.ninang { background: #FFF0F3; color: var(--color-primary-dark); }
      &.ninong { background: #F5EFEB; color: #5D4037; }
    }

    .name {
      font-family: var(--font-subheading);
      font-size: 1.3rem;
      color: var(--color-text);
      margin: 0;
      font-weight: 500;
      
      @media (min-width: 600px) {
        font-size: 1.4rem;
      }
    }

    .appreciation-text {
      font-family: var(--font-secondary);
      font-size: 1.1rem;
      font-style: italic;
      color: var(--color-text-light);
      max-width: 600px;
      line-height: 1.6;
      border-top: 1px solid rgba(0,0,0,0.05);
    }
  `]
})
export class GodparentsComponent {
  content = CONTENT;

  ninangs = this.content.godparents.filter(gp => gp.role === 'Ninang');
  ninongs = this.content.godparents.filter(gp => gp.role === 'Ninong');

  zippedGodparents = this.zipGodparents();

  private zipGodparents() {
    const zipped = [];
    const max = Math.max(this.ninangs.length, this.ninongs.length);
    for (let i = 0; i < max; i++) {
      if (this.ninangs[i]) zipped.push(this.ninangs[i]);
      if (this.ninongs[i]) zipped.push(this.ninongs[i]);
    }
    return zipped;
  }
}
