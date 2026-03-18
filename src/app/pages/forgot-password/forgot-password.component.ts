import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email = '';
  loading = false;
  message = '';
  error = '';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  async handleReset(event: Event) {
    event.preventDefault();
    this.loading = true;
    this.message = '';
    this.error = '';

    try {
      const { error } = await this.auth.resetPassword(this.email);
      if (error) throw error;
      this.message = 'Password reset link sent to your email!';
    } catch (e: any) {
      this.error = e.message || 'Failed to send reset link';
    } finally {
      this.loading = false;
    }
  }
}
