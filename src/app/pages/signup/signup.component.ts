import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;
  error = '';
  showTerms = false;
  termsAccepted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router, 
    private auth: AuthService
  ) {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  async handleSignup() {
    if (this.signupForm.invalid) return;

    if (!this.termsAccepted) {
      this.showTerms = true;
      return;
    }
    
    this.loading = true;
    this.error = '';

    const { fullName, email, password } = this.signupForm.value;

    try {
      const { data, error } = await firstValueFrom(this.auth.signUp(email, password, {
        full_name: fullName
      }));
      if (error) throw error;
      
      if (!data.session) {
        this.error = 'Verification email sent! Please check your inbox and confirm your email to continue.';
        return;
      }

      // Navigate to dashboard after successful signup
      this.router.navigate(['/dashboard']);
    } catch (e: any) {
      this.error = e.message || 'Failed to sign up';
    } finally {
      this.loading = false;
    }
  }

  async signUpWithGoogle() {
    try {
      await this.auth.signInWithGoogle();
    } catch (e: any) {
      this.error = e.message || 'Failed to sign up with Google';
    }
  }
}
