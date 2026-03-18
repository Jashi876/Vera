import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  fullName = '';
  email = '';
  password = '';
  loading = false;
  error = '';
  showTerms = false;
  termsAccepted = false;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  async handleSignup(event: Event) {
    event.preventDefault();
    if (!this.termsAccepted) {
      this.showTerms = true;
      return;
    }
    
    this.loading = true;
    this.error = '';

    try {
      const { data, error } = await this.auth.signUp(this.email, this.password, {
        full_name: this.fullName
      });
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
