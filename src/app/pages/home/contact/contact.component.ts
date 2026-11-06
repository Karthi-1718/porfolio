import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ContactService } from '../../../core/services/contact.service';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  status: FormStatus = 'idle';
  statusMessage = '';

  contactDetails = [
    {
      icon: 'mail',
      label: 'Email',
      value: 'karthikeyan@example.com', // Replace with actual email
      href: 'mailto:karthikeyan@example.com',
    },
    {
      icon: 'map-pin',
      label: 'Location',
      value: 'Tamil Nadu, India',
      href: null,
    },
    {
      icon: 'github',
      label: 'GitHub',
      value: 'github.com/karthikeyan', // Replace
      href: 'https://github.com/karthikeyan',
    },
    {
      icon: 'linkedin',
      label: 'LinkedIn',
      value: 'linkedin.com/in/karthikeyan', // Replace
      href: 'https://linkedin.com/in/karthikeyan',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
      subject: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(5000)]],
      website: [''], // honeypot - must stay empty
    });
  }

  get f(): Record<string, AbstractControl> {
    return this.contactForm.controls;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.f[fieldName];
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.f[fieldName];
    if (!field || !field.errors) return '';

    const errors: Record<string, string> = {
      required: `${this.capitalize(fieldName)} is required`,
      email: 'Please enter a valid email address',
      minlength: `${this.capitalize(fieldName)} is too short`,
      maxlength: `${this.capitalize(fieldName)} is too long`,
    };

    const firstError = Object.keys(field.errors)[0];
    return errors[firstError] ?? 'Invalid value';
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  onSubmit(): void {
    if (this.contactForm.invalid || this.status === 'loading') return;

    // Check honeypot
    if (this.f['website'].value) {
      this.status = 'success';
      this.statusMessage = 'Your message has been sent!';
      return;
    }

    this.status = 'loading';
    this.statusMessage = '';

    const formData = {
      name: this.f['name'].value.trim(),
      email: this.f['email'].value.trim(),
      subject: this.f['subject'].value.trim(),
      message: this.f['message'].value.trim(),
      website: '', // honeypot
    };

    this.contactService.sendMessage(formData).subscribe({
      next: (res) => {
        this.status = 'success';
        this.statusMessage = res.message || 'Message sent successfully!';
        this.contactForm.reset();
      },
      error: (err: Error) => {
        this.status = 'error';
        this.statusMessage = err.message || 'Failed to send message. Please try again.';
      },
    });
  }

  resetStatus(): void {
    this.status = 'idle';
    this.statusMessage = '';
  }
}
