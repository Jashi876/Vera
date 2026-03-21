import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private router: Router, 
    private auth: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  async handleLogin() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.error = '';

    const { email, password } = this.loginForm.value;

    try {
      const { data, error } = await firstValueFrom(this.auth.signIn(email, password));
      if (error) throw error;
      
      this.router.navigate(['/dashboard']);
    } catch (e: any) {
      if (e.message?.toLowerCase().includes('email not confirmed')) {
        this.error = 'Email not confirmed. Please check your inbox for a verification link.';
      } else {
        this.error = e.message || 'Failed to login';
      }
    } finally {
      this.loading = false;
    }
  }

  async signInWithGoogle() {
    try {
      await this.auth.signInWithGoogle();
    } catch (e: any) {
      this.error = e.message || 'Failed to sign in with Google';
    }
  }
}
