import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome-overlay',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overlay" [class.fade-out]="isFading">
      <div class="glass-container">
        <!-- Decorative Elements -->
        <div class="glow-orb top-left"></div>
        <div class="glow-orb bottom-right"></div>
        
        <div class="content">
          <p class="invitation-message">We are blessed to celebrate a double milestone for our little one.</p>
          <p class="invitation-message">Join us as we welcome her into the Christian world through baptism and give thanks for her first year of life.</p>
          <p class="invitation-message">Your presence means so much to us as we celebrate this special moment with Zaejin.</p>
          <p class="invitation-message highlight">We truly look forward to seeing you there!</p>
          
          <div class="divider">
            <span class="line"></span>
            <span class="ornament">🌸</span>
            <span class="line"></span>
          </div>
          
          <button class="enter-btn" (click)="onEnter()" aria-label="Enter Invitation">
            <span class="btn-content">
              <span>View Invitation</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="arrow-icon"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </span>
            <div class="btn-glow"></div>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: var(--gradient-main);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    .fade-out {
      opacity: 0;
      visibility: hidden;
      transform: scale(1.05); /* Slight zoom out effect on exit */
      filter: blur(20px);
    }

    .glass-container {
      position: relative;
      background: rgba(255, 255, 255, 0.65);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.8);
      border-radius: 0;
      padding: 4rem 3rem;
      width: 90%;
      max-width: 600px;
      box-shadow: 
        0 20px 40px rgba(0,0,0,0.05), /* Soft shadow */
        0 0 0 1px rgba(255,255,255, 0.5) inset; /* Inner border light */
      overflow: hidden;
      animation: float 6s ease-in-out infinite;
    }

    /* Decorative Orbs inside Glass */
    .glow-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(60px);
      z-index: -1;
      opacity: 0.6;
    }
    
    .glow-orb.top-left {
      top: -50px;
      left: -50px;
      width: 200px;
      height: 200px;
      background: var(--color-primary);
    }

    .glow-orb.bottom-right {
      bottom: -50px;
      right: -50px;
      width: 250px;
      height: 250px;
      background: var(--color-secondary);
    }

    .content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .baby-name {
      font-family: var(--font-heading);
      font-size: 6.5rem; /* Increased from 5.5rem */
      line-height: 1.1;
      background: linear-gradient(135deg, var(--color-text) 30%, var(--color-primary-dark) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 2rem;
      opacity: 0;
      animation: fadeInUp 0.8s ease-out 0.2s forwards;
      filter: drop-shadow(0 2px 4px rgba(255, 154, 158, 0.1));
    }

    .invitation-message {
      font-family: var(--font-body);
      font-size: 1.4rem; /* Increased from 1.1rem for invitation letter feel */
      color: var(--color-text);
      margin-bottom: 1.2rem;
      max-width: 550px;
      opacity: 0;
      animation: fadeInUp 0.8s ease-out 0.4s forwards;

      &.highlight {
        font-weight: 600;
        color: var(--color-primary-dark);
        font-size: 1.5rem; /* Even larger for emphasis */
        margin-bottom: 2.5rem;
      }
    }

    .divider {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      gap: 1rem;
      margin-bottom: 3rem;
      opacity: 0;
      animation: expandWidth 0.8s ease-out 0.6s forwards;

      .line {
        height: 1px;
        flex: 1;
        max-width: 60px;
        background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
        opacity: 0.8; /* Increased from 0.3 for the gradient version */
      }

      .ornament {
        color: var(--color-primary); /* Pink */
        font-size: 1.5rem;
      }
    }

    /* Premium Button */
    .enter-btn {
      position: relative;
      background: var(--gradient-coral);
      border: none;
      padding: 1.2rem 3.5rem;
      border-radius: 0;
      cursor: pointer;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      box-shadow: 0 10px 20px rgba(255, 127, 127, 0.2);
      opacity: 0;
      animation: fadeInUp 0.8s ease-out 0.8s forwards;

      /* Button specific font settings */
      font-family: var(--font-subheading);
      font-size: 1rem;
      letter-spacing: 1px;
      color: white;
      text-transform: uppercase;
      font-weight: 600;

      .btn-content {
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        gap: 0.8rem;
      }

      .arrow-icon {
        transition: transform 0.3s ease;
      }

      .btn-glow {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        transition: left 0.6s ease;
        z-index: 1;
      }

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 15px 30px rgba(255, 127, 127, 0.3);
        
        .arrow-icon {
          transform: translateX(4px);
        }

        .btn-glow {
          left: 100%; /* Shine effect */
        }
      }

      &:active {
        transform: translateY(-1px);
        box-shadow: 0 5px 10px rgba(255, 127, 127, 0.2);
      }
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes expandWidth {
      from { opacity: 0; width: 50%; }
      to { opacity: 1; width: 100%; }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }

    @media (max-width: 768px) {
      .glass-container {
        padding: 3rem 1.5rem;
        width: 95%;
      }
      .baby-name {
        font-size: 3.5rem;
      }
      .enter-btn {
        width: 100%;
        padding: 1.2rem 2rem;
      }
    }
  `]
})
export class WelcomeOverlayComponent {
  @Input() name: string = '';
  @Output() enter = new EventEmitter<void>();

  isFading = false;

  onEnter() {
    this.isFading = true;
    // Wait for exit transition to complete
    setTimeout(() => {
      this.enter.emit();
    }, 800); // Matched with CSS transition time
  }
}
