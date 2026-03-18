import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  async handleLogin(event: Event) {
    event.preventDefault();
    this.loading = true;
    this.error = '';

    try {
      const { data, error } = await this.auth.signIn(this.email, this.password);
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
