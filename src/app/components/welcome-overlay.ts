import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome-overlay',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overlay" [class.fade-out]="isFading">
      <div class="content">
        <div class="welcome-text">Welcome to the Christening of</div>
        <h1 class="baby-name">{{ name }}</h1>
        
        <button class="enter-btn" (click)="onEnter()">
          <span class="icon">✨</span>
          <span class="label">Enter Invitation</span>
        </button>
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
      background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%); /* Soft neutral */
      /* Or use the main theme gradient if preferred */
      background: linear-gradient(135deg, #fff0f3 0%, #e0f7fa 100%);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
                  visibility 0.4s,
                  transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                  filter 0.4s ease;
    }

    .fade-out {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transform: scale(1.1);
      filter: blur(10px);
    }

    .content {
      padding: 2rem;
      animation: float 3s ease-in-out infinite;
    }

    .welcome-text {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.5rem;
      letter-spacing: 2px;
      color: #7a7a7a;
      margin-bottom: 1rem;
      text-transform: uppercase;
    }

    .baby-name {
      font-family: 'Great Vibes', cursive;
      font-size: 5rem;
      background: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 3rem;
      line-height: 1.2;
    }

    .enter-btn {
      background: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.8);
      padding: 1rem 3rem;
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.2rem;
      color: #555;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      transition: all 0.4s ease;
      text-transform: uppercase;
      letter-spacing: 2px;
      /* Square corners per request */
      border-radius: 0; 
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);

      &:hover {
        background: rgba(255, 255, 255, 0.8);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(255, 154, 158, 0.3);
      }
    }

    @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
    }

    @media (max-width: 768px) {
      .baby-name {
        font-size: 3.5rem;
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
    // Wait for animation to finish before emitting
    setTimeout(() => {
      this.enter.emit();
    }, 400);
  }
}
