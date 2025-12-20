import { Component, OnInit, OnDestroy, signal, HostListener, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTENT } from '../website-content';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero-section">
      <div class="background-overlay"></div>
      
      <!-- Floating Balloons -->
      <div class="floating-elements">
         <div class="balloon balloon-1"></div>
         <div class="balloon balloon-2"></div>
         <div class="balloon balloon-3"></div>
      </div>

      <div class="content container">
        <div class="title-group">
          <h2 class="sub-title">YOU ARE INVITED!</h2>
          <div class="name-container">
            <h1 class="main-title serif-italic">{{ content.baby.name }}</h1>
          </div>
          <p class="turns-one">Turns One</p>
          <p class="date">{{ content.event.dateDisplay }}</p>
        </div>

        <div class="countdown-container">
          <div class="countdown-timer glass-card">
            <div class="time-block">
              <span class="number">{{ timeLeft().days }}</span>
              <span class="label">Days</span>
            </div>
            <div class="divider"></div>
            <div class="time-block">
              <span class="number">{{ timeLeft().hours }}</span>
              <span class="label">Hours</span>
            </div>
            <div class="divider"></div>
            <div class="time-block">
              <span class="number">{{ timeLeft().minutes }}</span>
              <span class="label">Mins</span>
            </div>
            <div class="divider"></div>
            <div class="time-block">
              <span class="number">{{ timeLeft().seconds }}</span>
              <span class="label">Secs</span>
            </div>
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

    .hero-section {
      height: 100vh;
      width: 100%;
      position: sticky;
      top: 0;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 0;
      will-change: transform;
      overflow: hidden;
      background: transparent !important;
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
      justify-content: center;
      gap: 1.5rem;
      width: 100%;
      height: 100%;
      padding: 2rem 1rem;
      animation: fadeInUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    .title-group {
      text-shadow: 0 2px 10px rgba(255, 255, 255, 0.8);
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .sub-title {
      font-family: var(--font-secondary);
      font-size: 1.4rem;
      text-transform: uppercase;
      letter-spacing: 0.4em;
      color: var(--color-text-light);
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .name-container {
      margin-bottom: 0.2rem;
    }

    .main-title {
      font-family: var(--font-primary);
      font-size: clamp(6rem, 12vw, 8rem); 
      line-height: 1.0;
      font-weight: 400;
      background: var(--gradient-coral);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.01em;
    }

    .serif-italic {
      font-family: var(--font-subheading);
      font-style: italic;
      font-weight: 400;
    }

    .turns-one {
      font-family: var(--font-secondary);
      font-size: 1.4rem; 
      text-transform: uppercase;
      letter-spacing: 0.3em;
      color: var(--color-gold);
      font-weight: 600;
      margin-top: 0.5rem;
    }

    .date {
      font-family: var(--font-secondary);
      font-size: 1.2rem; 
      font-weight: 500;
      color: var(--color-text-light);
      letter-spacing: 0.05em;
      margin-top: 0.5rem;
    }

    .countdown-container {
      width: 100%;
      max-width: 500px;
      margin-top: 1rem;
    }

    .countdown-timer {
      padding: 1.5rem 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }

    .time-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 60px;

      .number {
        font-family: var(--font-subheading);
        font-size: 2.2rem;
        font-weight: 300;
        color: var(--color-primary);
        line-height: 1;
      }

      .label {
        font-family: var(--font-secondary);
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--color-text-light);
        margin-top: 0.4rem;
        font-weight: 500;
      }
    }

    .divider {
      width: 1px;
      height: 40px;
      background: rgba(0, 0, 0, 0.08);
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes float {
      0%, 100% { transform: translate(0, 0); }
      33% { transform: translate(30px, -50px); }
      66% { transform: translate(-20px, 20px); }
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
    // Use setTimeout to avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => this.updateTimer(), 0);
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
