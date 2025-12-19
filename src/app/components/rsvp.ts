import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CONTENT } from '../website-content';

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="rsvp-section container">
      <div class="rsvp-card glass-card">
        <h2 class="section-title">RSVP</h2>
        <p class="subtitle">Kindly respond by {{ content.event.rsvpDeadline }}</p>

        <!-- Success Message -->
        <div *ngIf="submitted" class="success-message">
          <div class="success-icon">💌</div>
          <h3>Thank You!</h3>
          <p>Your response has been recorded. We can't wait to see you!</p>
        </div>

        <!-- RSVP Form -->
        <form *ngIf="!submitted" [formGroup]="rsvpForm" (ngSubmit)="onSubmit()">

          <div class="form-group">
            <label for="name">Full Name <span class="required">*</span></label>
            <input type="text" id="name" formControlName="name" placeholder="Enter your full name"
              [class.error]="isFieldInvalid('name')">
            <div class="error-msg" *ngIf="isFieldInvalid('name')">
              Name is required
            </div>
          </div>

          <div class="form-group">
            <label>Will you join us? <span class="required">*</span></label>
            <div class="radio-group">
              <label class="radio-option">
                <input type="radio" value="yes" formControlName="attending">
                <span class="radio-tile">
                  <span class="emoji">🥰</span>
                  <span>Yes, joyfully!</span>
                </span>
              </label>
              <label class="radio-option">
                <input type="radio" value="no" formControlName="attending">
                <span class="radio-tile">
                  <span class="emoji">😔</span>
                  <span>Regretfully no</span>
                </span>
              </label>
            </div>
            <div class="error-msg" *ngIf="isFieldInvalid('attending')">
              Please select an option
            </div>
          </div>

          <div class="form-group" *ngIf="rsvpForm.get('attending')?.value === 'yes'">
            <label for="guests">Number of Guests (Max 5)</label>
            <input type="number" id="guests" formControlName="guests" min="1" max="5"
              (input)="limitGuests($event)">
          </div>

          <div class="form-group">
            <label for="message">Message for the Baby (Optional)</label>
            <textarea id="message" formControlName="message" rows="4"
              placeholder="Write a sweet note..."></textarea>
          </div>

          <button type="submit" class="btn-primary" [disabled]="rsvpForm.invalid || isSubmitting">
            {{ isSubmitting ? 'Sending...' : 'Submit RSVP' }}
          </button>
        </form>
    <!-- Success Modal -->
    <div class="modal-overlay" *ngIf="showModal" (click)="closeModal()">
      <div class="modal-content glass-card" (click)="$event.stopPropagation()">
        <div class="success-icon">💌</div>
        <h3>RSVP Confirmed!</h3>
        <p>Thank you, {{ storedName || 'Guest' }}!</p>
        <p>We received your response.</p>
        <button class="btn-primary" (click)="closeModal()">Close</button>
      </div>
    </div>
      </div>
    </section>
  `,
  styles: [`
    .rsvp-section {
      padding: var(--spacing-section) 0;
      display: flex;
      justify-content: center;
    }

    .rsvp-card {
      width: 100%;
      max-width: 600px;
      padding: 3rem;
      background: white; /* Fallback */
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(15px);
      border-radius: 0; /* Square corners */
      border: 1px solid rgba(255, 255, 255, 0.8);
      box-shadow: var(--shadow-lg);
    }

    .section-title {
      text-align: center;
      margin-bottom: 0.5rem;
      color: var(--color-primary);
    }

    .subtitle {
      text-align: center;
      color: var(--color-text-light);
      margin-bottom: 3rem;
      font-style: italic;
    }

    .form-group {
      margin-bottom: 2rem;

      label {
        display: block;
        margin-bottom: 0.8rem;
        font-weight: 600;
        color: var(--color-text);
        font-size: 0.95rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        
        .required { color: var(--color-highlight); margin-left: 4px; }
      }

      input[type="text"],
      input[type="number"],
      textarea {
        width: 100%;
        padding: 1rem;
        border: 2px solid #eee;
        border-radius: 0; /* Square corners */
        font-family: inherit;
        font-size: 1rem;
        transition: all 0.3s;
        background: rgba(255,255,255,0.5);

        &:focus {
          outline: none;
          border-color: var(--color-primary);
          background: white;
          box-shadow: 0 0 0 4px rgba(255, 127, 127, 0.1);
        }
        
        &.error {
          border-color: var(--color-highlight);
          background: #fff0f3;
        }
      }
      
      .error-msg {
        color: var(--color-highlight);
        font-size: 0.85rem;
        margin-top: 0.5rem;
      }
    }

    .radio-group {
      display: flex;
      gap: 1rem;
    }

    .radio-option {
      flex: 1;
      cursor: pointer;
      display: flex; /* Ensure container is flex to stretch children */

      input {
        display: none;
      }

      .radio-tile {
        flex: 1; /* Stretch to fill height of radio-option */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center; /* Center content vertically */
        gap: 0.5rem;
        padding: 1.5rem;
        border: 2px solid #eee;
        border-radius: 0; /* Square corners */
        transition: all 0.3s;
        height: 100%; /* Ensure full height */

        .emoji { font-size: 2rem; }
        span:last-child { 
           font-weight: 500; 
           text-align: center; /* Handle text wrap nicely */
        }
      }

      input:checked + .radio-tile {
        border-color: var(--color-primary);
        background: rgba(255, 127, 127, 0.05);
        color: var(--color-primary);
        transform: translateY(-2px);
      }
    }

    .btn-primary {
      width: 100%;
      padding: 1.2rem;
      font-size: 1.1rem;
      background: var(--gradient-coral);
      color: white;
      border: none;
      border-radius: 0; /* Square corners */
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: var(--shadow-sm);

      &:hover:not(:disabled) {
        transform: translateY(-3px);
        box-shadow: var(--shadow-lg);
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      z-index: 1000;
      display: flex;
      justify-content: center;
      align-items: center;
      animation: fadeIn 0.3s ease;
    }

    .modal-content {
      background: rgba(255, 255, 255, 0.95);
      padding: 3rem;
      border-radius: 0;
      text-align: center;
      max-width: 90%;
      width: 400px;
      box-shadow: var(--shadow-lg);
      animation: scaleUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      
      h3 {
        color: var(--color-primary);
        font-family: var(--font-primary);
        font-size: 2rem;
        margin: 1rem 0;
      }
      
      p { margin-bottom: 2rem; color: var(--color-text); }
      
      .btn-primary { width: auto; min-width: 200px; }
    }
    
    @keyframes scaleUp {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .success-message {
      text-align: center;
      padding: 3rem;
      
      .success-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
      }

      h3 {
        font-size: 2rem;
        color: var(--color-primary);
        margin-bottom: 1rem;
        font-family: var(--font-primary);
      }
      
      p { color: var(--color-text); }
    }

    @media (max-width: 640px) {
      .rsvp-card { 
        padding: 2rem 1.5rem; 
        border-radius: 0 !important;
        border: none !important;
        box-shadow: none !important;
        width: 100% !important;
        max-width: 100% !important;
      }
      
      .rsvp-section {
         padding-left: 0;
         padding-right: 0;
      }
      
      .modal-content { /* Adjust modal for mobile */
         padding: 2rem;
         width: 85%;
         border-radius: 20px;
      }
    }
  `]
})
export class RsvpComponent {
  content = CONTENT;
  submitted = false;
  isSubmitting = false;
  showModal = false;
  rsvpForm: FormGroup;
  // storedName to show in modal after reset
  storedName = '';

  constructor(private fb: FormBuilder) {
    this.rsvpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      attending: ['yes', Validators.required],
      guests: [1, [Validators.min(1), Validators.max(5)]],
      message: ['']
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.rsvpForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  limitGuests(event: any) {
    const input = event.target as HTMLInputElement;
    let value = parseInt(input.value);

    if (value > 5) {
      input.value = '5';
      this.rsvpForm.get('guests')?.setValue(5);
    } else if (value < 1) {
      // Optional: enforce min 1, though standard behavior usually allows clearing to type new number
      // keeping empty string valid for a moment while typing is better UX, but let's clamp max strictly
    }
  }

  private readonly GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz0F3ViyjMBACgZDf1gmce0wbklvxCjKcruOkr4bN9HriYjA1TtvYhCOquFGDTXj0SY/exec';

  onSubmit() {
    if (this.rsvpForm.valid) {
      this.isSubmitting = true;
      this.storedName = this.rsvpForm.value.name;

      const formData = new FormData();
      formData.append('name', this.rsvpForm.value.name);
      formData.append('attending', this.rsvpForm.value.attending);

      // If not attending, set guests to 0
      const guestCount = this.rsvpForm.value.attending === 'yes' ? this.rsvpForm.value.guests : 0;
      formData.append('guests', guestCount.toString());

      formData.append('message', this.rsvpForm.value.message);

      fetch(this.GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      })
        .then(() => {
          this.isSubmitting = false;
          this.submitted = true;
          this.showModal = true;
          this.rsvpForm.reset({
            name: '',
            attending: 'yes',
            guests: 1,
            message: ''
          });
        })
        .catch(error => {
          console.error('Error!', error.message);
          this.isSubmitting = false;
          alert('Something went wrong. Please try again.');
        });

    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.rsvpForm.controls).forEach(key => {
        const control = this.rsvpForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  closeModal() {
    this.showModal = false;
  }
}
