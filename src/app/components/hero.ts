import { Component, OnInit, OnDestroy, signal, HostListener, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTENT } from '../website-content';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero-section" [style.transform]="'translateY(' + parallaxOffset() + 'px)'">
      <div class="background-overlay"></div>
      
      <!-- Floating Balloons for added depth -->
      <div class="floating-elements">
         <div class="balloon balloon-1"></div>
         <div class="balloon balloon-2"></div>
         <div class="balloon balloon-3"></div>
      </div>

      <div class="content container">
        <div class="title-group">
          <h2 class="sub-title">YOU ARE INVITED!</h2>
          <h1 class="main-title">{{ content.baby.name }}</h1>
          <p class="turns-one">TURNS ONE</p>
          <p class="date">{{ content.event.dateDisplay }}</p>
        </div>

        <div class="countdown-timer glass-card">
          <div class="time-block">
            <span class="number">{{ timeLeft().days }}</span>
            <span class="label">Days</span>
          </div>
          <div class="divider">:</div>
          <div class="time-block">
            <span class="number">{{ timeLeft().hours }}</span>
            <span class="label">Hours</span>
          </div>
          <div class="divider">:</div>
          <div class="time-block">
            <span class="number">{{ timeLeft().minutes }}</span>
            <span class="label">Mins</span>
          </div>
          <div class="divider">:</div>
          <div class="time-block">
            <span class="number">{{ timeLeft().seconds }}</span>
            <span class="label">Secs</span>
          </div>
        </div>

        <button class="cta-button" (click)="scrollToRsvp()">RSVP Now</button>
      </div>

      <div class="scroll-indicator">
        <span>Scroll</span>
        <span class="arrow">↓</span>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      overflow: hidden;
    }

    .hero-section {
      height: 100vh;
      width: 100%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      /* Background Image Removed to match Intro/App Background */
      will-change: transform;
    }

    .background-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,240,243,0.2) 100%);
      z-index: 1;
    }

    .content {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3rem;
      animation: fadeInUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    .title-group {
      text-shadow: 0 2px 10px rgba(255, 255, 255, 0.8);
    }

    .sub-title {
      font-family: var(--font-secondary);
      font-size: 1.8rem; /* Increased from 1.2rem */
      text-transform: uppercase;
      letter-spacing: 6px;
      color: var(--color-text-light);
      margin-bottom: 1.5rem;
      font-weight: 500;
    }

    .main-title {
      font-family: var(--font-primary);
      font-size: clamp(5rem, 10vw, 9rem); /* Increased from clamp(3.5rem, 8vw, 7rem) */
      line-height: 1.1;
      margin-bottom: 1rem;
      background: var(--gradient-coral);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      /* Fallback for legibility if gradient fails or text-shadow needed */
      filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
    }

    .turns-one {
      font-family: var(--font-secondary);
      font-size: 2.5rem; /* Increased from 1.8rem */
      text-transform: uppercase;
      letter-spacing: 8px;
      color: var(--color-gold);
      font-weight: 700;
      margin-bottom: 1.5rem;
    }

    .date {
      font-family: var(--font-secondary);
      font-size: 1.8rem; /* Increased from 1.5rem */
      font-weight: 600;
      color: var(--color-text);
      letter-spacing: 1px;
    }

    .glass-card {
      background: var(--glass-bg);
      backdrop-filter: var(--glass-backdrop);
      -webkit-backdrop-filter: var(--glass-backdrop);
      border: var(--glass-border);
      box-shadow: var(--shadow-lg);
      border-radius: 0;
      padding: 2rem 3rem;
    }

    .countdown-timer {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      
      .time-block {
        display: flex;
        flex-direction: column;
        min-width: 80px;

        .number {
          font-family: var(--font-primary);
          font-size: 3rem;
          font-weight: 700;
          color: var(--color-primary);
          line-height: 1;
        }

        .label {
          font-family: var(--font-secondary);
          font-size: 0.9rem; /* Increased from 0.75rem */
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--color-text-light);
          margin-top: 0.5rem;
          font-weight: 600;
        }
      }

      .divider {
        font-family: var(--font-primary);
        font-size: 2.5rem;
        color: var(--color-accent);
        margin-top: -1rem;
      }
    }

    .cta-button {
      padding: 1rem 3rem;
      font-size: 1.1rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: white;
      background: var(--gradient-gold);
      border: none;
      border-radius: 0;
      cursor: pointer;
      box-shadow: var(--shadow-md);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(rgba(255,255,255,0.2), transparent);
        opacity: 0;
        transition: opacity 0.3s;
      }

      &:hover {
        transform: translateY(-3px);
        box-shadow: var(--shadow-glow);
        
        &::after {
          opacity: 1;
        }
      }
    }

    .scroll-indicator {
      position: absolute;
      bottom: 5vh;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      color: var(--color-text-light);
      animation: bounce 2s infinite;
      
      span {
        font-size: 0.95rem; /* Increased from 0.8rem */
        letter-spacing: 3px;
        text-transform: uppercase;
      }
      
      .arrow {
        font-size: 1.5rem;
      }
    }

    /* Floating Balloons Decoration */
    .floating-elements {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 5;
    }

    .balloon {
      position: absolute;
      border-radius: 50%;
      opacity: 0.6;
      mix-blend-mode: multiply;
      animation: float 20s infinite ease-in-out;
    }

    .balloon-1 {
      width: 300px;
      height: 300px;
      background: radial-gradient(circle at 30% 30%, var(--color-accent), transparent);
      top: -50px;
      right: -100px;
      animation-duration: 25s;
    }

    .balloon-2 {
      width: 200px;
      height: 200px;
      background: radial-gradient(circle at 30% 30%, var(--color-secondary), transparent);
      top: 20%;
      left: -50px;
      animation-duration: 18s;
      animation-delay: -5s;
    }

    .balloon-3 {
      width: 150px;
      height: 150px;
      background: radial-gradient(circle at 30% 30%, var(--color-primary), transparent);
      bottom: 10%;
      right: 10%;
      animation-duration: 22s;
      animation-delay: -10s;
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
      60% { transform: translateY(-5px); }
    }

    @keyframes float {
      0%, 100% { transform: translate(0, 0); }
      33% { transform: translate(30px, -50px); }
      66% { transform: translate(-20px, 20px); }
    }

    @media (max-width: 768px) {
      .countdown-timer {
        padding: 1.5rem;
        gap: 0.5rem;
        
        .divider { display: none; }
        
        .time-block {
          min-width: auto;
          .number { font-size: 1.8rem; }
        }
      }
    }
  `]
})
export class HeroComponent implements OnInit, OnDestroy {
  content = CONTENT;
  targetDate: Date = new Date();
  timeLeft = signal({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  parallaxOffset = signal(0);
  private intervalId: any;

  @HostListener('window:scroll')
  onScroll() {
    const scrolled = window.scrollY || document.documentElement.scrollTop;
    // Parallax effect: move content at 40% of scroll speed
    this.parallaxOffset.set(scrolled * 0.4);
  }

  ngOnInit() {
    this.targetDate = new Date(this.content.event.date); // Load from config
    this.updateTimer();
    this.intervalId = setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  scrollToRsvp() {
    const rsvpSection = document.getElementById('rsvp');
    if (rsvpSection) {
      rsvpSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private updateTimer() {
    const now = new Date().getTime();
    const distance = this.targetDate.getTime() - now;

    if (distance < 0) {
      this.timeLeft.set({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      clearInterval(this.intervalId);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.timeLeft.set({ days, hours, minutes, seconds });
  }
}
