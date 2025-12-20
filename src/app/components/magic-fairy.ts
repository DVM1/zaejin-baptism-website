import { Component, OnInit, OnDestroy, ElementRef, ViewChild, ChangeDetectorRef, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Spark {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: string;
}

@Component({
  selector: 'app-magic-fairy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fairy-container" 
         [style.left.px]="x()" 
         [style.top.px]="y()" 
         [style.transform]="getContainerTransform()"
         [class.moving]="isMoving()"
         [class.visible]="isVisible()">
      
      <!-- Spark Trails (Inside container so they follow) -->
      <div class="sparks-container">
        <div *ngFor="let spark of sparks()" 
             class="spark" 
             [style.left.px]="spark.x" 
             [style.top.px]="spark.y"
             [style.width.px]="spark.size"
             [style.height.px]="spark.size"
             [style.animation-delay]="spark.delay"
             [style.--spark-color]="color()">
        </div>
      </div>

      <div class="fairy-path-shaper" [class]="flightStyle()">
        <div class="fairy-wrapper" [style.transform]="'scale(' + scale() + ')'">
          <!-- Fairy SVG Silhouette -->
          <svg class="fairy-svg" 
               [style.transform]="'rotate(' + rotation() + 'deg)'"
               viewBox="0 0 100 100" 
               xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="fairyGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" [attr.stop-color]="color()" stop-opacity="0.9" />
                <stop offset="25%" [attr.stop-color]="color()" stop-opacity="0.3" />
                <stop offset="100%" [attr.stop-color]="color()" stop-opacity="0" />
              </radialGradient>
            </defs>

            <!-- Glow Aura -->
            <circle cx="50%" cy="50%" r="28%" fill="url(#fairyGlow)" />

            <!-- Fairy Body -->
            <g class="fairy-parts" [style.fill]="color()">
              <g class="wings">
                <path class="wing-upper" d="M50 45 C75 5, 98 25, 52 45" opacity="0.8" />
                <path class="wing-lower" d="M50 45 C80 75, 90 45, 52 45" opacity="0.7" />
                <path class="wing-upper-back" d="M48 45 C25 10, 5 30, 48 45" opacity="0.4" />
              </g>

              <g class="legs">
                 <path class="leg-back" d="M51 62 L56 86 C57 88, 60 88, 59 86 L53 62 Z" opacity="0.6" />
                 <path class="leg-front" d="M49 62 L44 91 C43 93, 46 93, 47 91 L51 62 Z" opacity="0.9" />
              </g>

              <path class="torso" d="M47 40 Q50 35 53 40 Q51 55 54 65 Q50 68 46 65 Q49 55 47 40 Z" />

              <g class="arms">
                <path class="arm-back" d="M48 44 L34 54 C33 55, 35 57, 36 56 L49 46 Z" opacity="0.5"/>
                <path class="arm-front" d="M52 44 L66 34 C67 33, 69 35, 68 36 L54 46 Z" />
              </g>

              <g class="head">
                <circle cx="50" cy="35" r="5.5" />
                <circle cx="54" cy="31" r="3.2" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 10000;
    }

    .fairy-container {
      position: absolute;
      width: 90px;
      height: 90px;
      
      @media (max-width: 768px) {
        width: 50px;
        height: 50px;
      }
      
      @media (max-width: 400px) {
        width: 35px;
        height: 35px;
      }
      /* Movement handled by TS Lerp for perfect sync */
      transition: opacity 1.5s ease-in-out,
                  transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
      will-change: left, top, transform, opacity;
      opacity: 0;
      transform: translate(-50%, -50%) scale(0);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .fairy-container.visible {
      opacity: 1;
    }

    .fairy-container.moving {
      /* Optional: add styles when moving */
    }

    .fairy-svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    /* Wing Flapping Animation */
    .wing-upper, .wing-upper-back {
      transform-origin: 50% 45%;
      animation: flap 0.15s ease-in-out infinite alternate;
    }
    .wing-lower {
      transform-origin: 50% 45%;
      animation: flap 0.15s ease-in-out infinite alternate-reverse;
    }

    @keyframes flap {
      0% { transform: scaleX(1) rotate(0deg); }
      100% { transform: scaleX(0.3) rotate(-10deg); }
    }

    /* Limb Swaying Animations */
    .arms {
      transform-origin: 50% 44%;
    }
    .arm-front {
      animation: armKick 2.2s ease-in-out infinite alternate;
      transform-origin: 52% 44%;
    }
    .arm-back {
      animation: armKick 2.2s ease-in-out infinite alternate-reverse;
      transform-origin: 48% 44%;
    }

    .legs {
      transform-origin: 50% 63%;
    }
    .leg-front {
      animation: legKick 2.8s ease-in-out infinite alternate;
      transform-origin: 49% 62%;
    }
    .leg-back {
      animation: legKick 2.8s ease-in-out infinite alternate-reverse;
      transform-origin: 51% 62%;
    }

    .head {
      transform-origin: 50% 35%;
      animation: tilt 3.5s ease-in-out infinite alternate;
    }

    @keyframes armKick {
      0% { transform: rotate(-10deg); }
      100% { transform: rotate(30deg); }
    }

    @keyframes legKick {
      0% { transform: rotate(-10deg); }
      100% { transform: rotate(10deg); }
    }

    @keyframes tilt {
      0% { transform: rotate(-6deg) translateY(0); }
      100% { transform: rotate(6deg) translateY(1px); }
    }

    /* Redundant styles removed - consolidated above */

    .fairy-container.hidden {
      opacity: 0;
    }

    /* Bobbing and Internal Movement */
    .fairy-wrapper {
      width: 100%;
      height: 100%;
      animation: bob 3s ease-in-out infinite alternate, shiver 0.5s ease-in-out infinite alternate;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @keyframes bob {
      0% { transform: translateY(-5px); }
      100% { transform: translateY(5px); }
    }

    @keyframes shiver {
      0% { transform: rotate(-1deg); }
      100% { transform: rotate(1deg); }
    }

    .fairy-path-shaper {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.8s ease-out;
    }

    .fairy-path-shaper.s-curve {
      animation: s-sway 3s ease-in-out infinite alternate;
    }

    .fairy-path-shaper.straight {
      /* Base bobbing only */
    }

    @keyframes s-sway {
      0% { transform: translate(-30px, -20px); }
      100% { transform: translate(30px, 20px); }
    }

    .fairy-svg {
      width: 100%;
      height: 100%;
      overflow: visible;
      transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    /* Spark Trail (Local to fairy) */
    .sparks-container {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      overflow: visible;
      pointer-events: none;
    }

    .spark {
      position: absolute;
      border-radius: 50%;
      background: #FFFFFF;
      /* Multi-layered "magical" shadow */
      box-shadow: 0 0 2px #FFF, 
                  0 0 6px var(--spark-color, #FFD700), 
                  0 0 12px var(--spark-color, #FFEEAD);
      animation: sparkFade 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      pointer-events: none;
      opacity: 0;
    }

    @keyframes sparkFade {
      0% { 
        transform: scale(1) translateY(0) rotate(0deg); 
        opacity: 1; 
      }
      100% { 
        transform: scale(0) translateY(40px) rotate(180deg); 
        opacity: 0; 
      }
    }
  `]
})
export class MagicFairyComponent implements OnInit, OnDestroy {
  @Input() themeColor?: string;
  @Input() index: number = 0;

  x = signal(Math.random() * window.innerWidth);
  y = signal(Math.random() * window.innerHeight);
  direction = signal<'left' | 'right'>('right');
  rotation = signal(0);
  scale = signal(this.getResponsiveScale());
  color = signal('');
  isMoving = signal(false);
  isVisible = signal(false);
  flightStyle = signal<'straight' | 's-curve'>('straight');
  sparks = signal<Spark[]>([]);

  getContainerTransform() {
    const visibilityScale = this.isVisible() ? this.scale() : 0;
    return `translate(-50%, -50%) scale(${visibilityScale})`;
  }

  private getResponsiveScale(): number {
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 400;

    if (isSmallMobile) {
      return 0.5 + Math.random() * 0.6; // Much smaller for tiny screens
    } else if (isMobile) {
      return 0.6 + Math.random() * 0.7; // Smaller for mobile
    }
    return 0.7 + Math.random() * 1.0; // Reduced desktop range
  }

  private targetX = 0;
  private targetY = 0;
  private rafId: number | null = null;
  private isMobile = window.innerWidth <= 768;

  private sparkId = 0;
  private moveTimer: any;
  private sparkTimer: any;
  private initTimer: any;

  private getRandomFairyColor() {
    const colors = ['#FF6B6B', '#A29BFE', '#FDCB6E'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.color.set(this.themeColor || this.getRandomFairyColor());
    // Stagger initial movements so they don't start in sync
    this.initTimer = setTimeout(() => {
      this.startMoving();
      // Disable sparkles on mobile for performance
      if (!this.isMobile) {
        this.startSparking();
      }
    }, this.index * 1500);
  }

  ngOnDestroy() {
    // Proper cleanup to prevent memory leaks and performance issues
    if (this.initTimer) clearTimeout(this.initTimer);
    if (this.moveTimer) clearTimeout(this.moveTimer);
    if (this.sparkTimer) clearInterval(this.sparkTimer);
    if (this.rafId) cancelAnimationFrame(this.rafId);

    // Clear arrays
    this.sparks.set([]);
  }

  private startMoving() {
    const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

    const animate = () => {
      const currentX = this.x();
      const currentY = this.y();

      // Sync current position with target using lerp for visual smoothness
      const lerpAmount = this.isMobile ? 0.008 : 0.005; // Slower, more graceful movement
      const nx = lerp(currentX, this.targetX, lerpAmount);
      const ny = lerp(currentY, this.targetY, lerpAmount);

      this.x.set(nx);
      this.y.set(ny);

      this.rafId = requestAnimationFrame(animate);
    };
    this.rafId = requestAnimationFrame(animate);

    const nextMove = async () => {
      const margin = 100;
      const nx = margin + Math.random() * (window.innerWidth - margin * 2);
      const ny = margin + Math.random() * (window.innerHeight - margin * 2);

      this.direction.set(nx < this.x() ? 'left' : 'right');
      this.targetX = nx;
      this.targetY = ny;

      const dx = nx - this.x();
      const dy = ny - this.y();
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      let targetRot = Math.max(-25, Math.min(25, angle * 0.4));
      if (this.direction() === 'left') targetRot = -targetRot;

      this.rotation.set(targetRot);
      this.flightStyle.set(Math.random() < 0.5 ? 's-curve' : 'straight');
      this.isMoving.set(true);

      this.cdr.detectChanges();

      // Next move in 6-10 seconds for more peaceful flight
      this.moveTimer = setTimeout(nextMove, 6000 + Math.random() * 4000);
    };

    // Start off-screen
    const sides = [
      { x: Math.random() * window.innerWidth, y: -120 },
      { x: Math.random() * window.innerWidth, y: window.innerHeight + 120 },
      { x: -120, y: Math.random() * window.innerHeight },
      { x: window.innerWidth + 120, y: Math.random() * window.innerHeight }
    ];
    const startPos = sides[this.index % 4];
    this.x.set(startPos.x);
    this.y.set(startPos.y);
    this.targetX = startPos.x;
    this.targetY = startPos.y;

    setTimeout(() => {
      this.isVisible.set(true);
      nextMove();
    }, 100);
  }

  private startSparking() {
    this.sparkTimer = setInterval(() => {
      if (!this.isVisible()) return;

      // Use local coordinates (relative to fairy center)
      const spark: Spark = {
        id: this.sparkId++,
        x: (Math.random() - 0.5) * 40,
        y: (Math.random() - 0.5) * 40,
        size: 2 + Math.random() * 5,
        delay: '0s'
      };

      const currentSparks = [...this.sparks(), spark];
      // Optimized: Reduced from 60 to 40 for better performance
      if (currentSparks.length > 40) currentSparks.shift();

      this.sparks.set(currentSparks);
      this.cdr.detectChanges();
    }, 100); // Optimized: Increased from 60ms to 100ms for better performance
  }
}
