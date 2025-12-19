import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTENT } from '../website-content';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule],
    template: `
    <footer class="footer">
       <div class="waves">
          <svg class="wave" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g class="parallax">
              <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(89, 53, 93, 0.7)" />
              <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(89, 53, 93, 0.5)" />
              <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(89, 53, 93, 0.3)" />
              <use xlink:href="#gentle-wave" x="48" y="7" fill="#5E3A5A" />
            </g>
          </svg>
        </div>
      
        <div class="footer-content container">
            <div class="logo-group">
               <h2 class="footer-logo">{{ content.baby.name }}</h2>
               <div class="divider">✦</div>
            </div>
            
            <p class="tagline">
              "For this child I prayed, and the Lord has granted me my petition."
            </p>

            <div class="footer-links">
               <span>Thank you for celebrating with us</span>
            </div>

            <p class="copyright">
                © {{ currentYear }} The Family. Designed with love.
            </p>
        </div>
    </footer>
  `,
    styles: [`
    .footer {
      position: relative;
      background: #5E3A5A; /* Deep Purple/Brown for contrast */
      color: rgba(255,255,255,0.8);
      margin-top: 8rem;
    }

    .waves {
      position: absolute;
      top: -100px;
      left: 0;
      width: 100%;
      height: 100px;
      overflow: hidden;
      line-height: 0;
    }

    .wave {
      width: 100%;
      height: 100px;
    }

    .parallax > use {
      animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
    }
    .parallax > use:nth-child(1) { animation-delay: -2s; animation-duration: 7s; }
    .parallax > use:nth-child(2) { animation-delay: -3s; animation-duration: 10s; }
    .parallax > use:nth-child(3) { animation-delay: -4s; animation-duration: 13s; }
    .parallax > use:nth-child(4) { animation-delay: -5s; animation-duration: 20s; }

    @keyframes move-forever {
      0% { transform: translate3d(-90px,0,0); }
      100% { transform: translate3d(85px,0,0); }
    }

    .footer-content {
      position: relative;
      z-index: 2;
      padding: 2rem 0 4rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }

    .logo-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .footer-logo {
      font-family: var(--font-primary);
      font-size: 3rem;
      color: white; /* Gold gradient or white */
      margin: 0;
      letter-spacing: 1px;
    }

    .divider {
      color: var(--color-gold);
      font-size: 1.5rem;
    }

    .tagline {
      font-family: var(--font-primary);
      font-style: italic;
      font-size: 1.1rem;
      max-width: 600px;
      color: rgba(255,255,255,0.7);
    }

    .footer-links {
      margin-top: 1rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: 0.9rem;
      color: var(--color-gold);
    }

    .copyright {
      margin-top: 3rem;
      font-size: 0.75rem;
      opacity: 0.4;
      font-family: var(--font-secondary);
    }

    @media (max-width: 768px) {
      .footer-logo { font-size: 2.2rem; }
      .waves { height: 60px; top: -60px; }
      .wave { height: 60px; }
    }
  `]
})
export class FooterComponent {
    content = CONTENT;
    currentYear = new Date().getFullYear();
}
