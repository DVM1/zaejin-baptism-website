import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome-overlay',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overlay" [class.fade-out]="isFading">
      <!-- The Envelope / Letter Container -->
      <div class="invitation-letter">
        <!-- Wax Seal -->
        <div class="wax-seal">
          <span>Z</span>
        </div>
        
        <!-- Address Label -->
        <div class="from-address">
          From: Maquiling Family
        </div>

        <div class="letter-content">
          <p class="invitation-message">We are blessed to celebrate a double milestone for our little one.</p>
          <p class="invitation-message">Join us as we welcome her into the Christian world through baptism and give thanks for her first year of life.</p>
          <p class="invitation-message">Your presence means so much to us as we celebrate this special moment with Zaejin.</p>
          <p class="invitation-message highlight">We truly look forward to seeing you there!</p>
          
          <button class="btn-primary enter-btn" (click)="onEnter()" aria-label="Open Invitation">
            <span class="btn-content">
              <span>Open</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: fixed;
      inset: 0;
      z-index: 9999;
      overflow: hidden;
    }

    .overlay {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.3); /* Dimmed backdrop */
      backdrop-filter: blur(5px);
      display: flex;
      flex-direction: column;
      padding: 3rem 1rem 1rem; /* Extra top padding for wax seal clearance */
      overflow-y: auto; 
      -webkit-overflow-scrolling: touch;
    }

    /* The Letter Card */
    .invitation-letter {
      position: relative;
      background: #FFFBF0; /* Cream / Ivory Paper */
      width: 100%;
      max-width: 550px;
      margin: auto; /* Centers vertically and horizontally */
      
      /* Desktop Padding */
      padding: 3.5rem 2.5rem 2.5rem;
      box-shadow: 
        0 2px 4px rgba(0,0,0,0.1), 
        0 15px 40px rgba(0,0,0,0.2);
      border: 1px solid #E8E0D0;
      text-align: center;
      animation: floatUp 1s ease-out forwards;
      background-image: linear-gradient(0deg, #FFFBF0 0%, #FFF8E7 100%);

      /* Mobile Compact View */
      @media (max-width: 768px) {
        padding: 3rem 1.5rem 2rem; 
      }
    }
    
    /* Elegant Border inside */
    .invitation-letter::before {
      content: '';
      position: absolute;
      top: 8px; left: 8px; right: 8px; bottom: 8px;
      border: 2px solid var(--color-gold);
      opacity: 0.3;
      pointer-events: none;
    }
    
    /* "To" Stamp */
    .from-address {
      position: absolute;
      top: 30px;
      left: 20px;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
      font-weight: 600;
      color: #5D4037; /* Darker brown, full opacity */
      text-align: left;
      transform: rotate(-2deg);
      border: 1px solid #8D6E63;
      background: rgba(255, 255, 255, 0.6); /* Semi-transparent white bg */
      padding: 0.3rem 0.6rem;
      border-radius: 4px;
      z-index: 5;
      
      @media (max-width: 400px) {
         font-size: 0.75rem;
         left: 15px;
      }
    }

    /* Wax Seal */
    .wax-seal {
      position: absolute;
      top: -35px; /* Moved up further to clear content */
      left: 50%;
      transform: translateX(-50%);
      width: 60px; /* Restored size */
      height: 60px;
      background: radial-gradient(circle at 30% 30%, #D32F2F, #B71C1C);
      border-radius: 50%;
      box-shadow: 0 4px 6px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #790e0e;
      font-family: var(--font-heading);
      font-size: 2rem;
      border: 2px solid #8E1515;
      z-index: 10;
    }

    .letter-content {
      margin-top: 1rem;
    }

    .invitation-message {
      font-family: var(--font-body);
      font-size: 1.25rem;
      color: var(--color-text);
      margin-bottom: 0.8rem;
      line-height: 1.6;

      &.highlight {
        font-weight: 600;
        color: var(--color-primary-dark);
        font-family: var(--font-subheading);
        margin-top: 1.5rem;
        font-size: 1.4rem;
      }
    }

    .divider {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin: 2rem 0;
      
      .line {
        height: 1px;
        width: 50px;
        background: var(--color-gold);
        opacity: 0.5;
      }
      
      .ornament {
        font-size: 1.2rem;
      }
    }

    .enter-btn {
      background: var(--color-gold); 
      /* Gold Button to match seal aesthetic */
      background: linear-gradient(135deg, #D4AF37 0%, #C5A028 100%);
      color: white;
      border: none;
      box-shadow: 0 4px 10px rgba(212, 175, 55, 0.3);
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 15px rgba(212, 175, 55, 0.4);
      }
    }

    @keyframes floatUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class WelcomeOverlayComponent {
  @Input() name: string = '';
  @Output() enter = new EventEmitter<void>();

  isFading = false;

  onEnter() {
    this.isFading = true;
    setTimeout(() => {
      this.enter.emit();
    }, 800);
  }
}
