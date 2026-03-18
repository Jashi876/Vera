import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  activeTab = 'account';
  loading = false;
  successMessage = '';
  
  profile = {
    fullName: '',
    email: '',
    role: 'Director',
    company: 'Vera Productions'
  };

  notificationSettings = {
    emailAlerts: true,
    shootingConflicts: true,
    aiOptimization: false,
    teamUpdates: true
  };

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.currentUser.subscribe(user => {
      if (user) {
        this.profile.email = user.email || '';
        this.profile.fullName = (user.user_metadata as any).full_name || '';
      }
    });
  }

  async saveAccount() {
    this.loading = true;
    this.successMessage = '';
    
    try {
      const { error } = await this.auth.updateProfile({
        full_name: this.profile.fullName,
        company: this.profile.company,
        role: this.profile.role
      });
      
      if (error) throw error;
      this.successMessage = 'Profile updated successfully!';
      setTimeout(() => this.successMessage = '', 3000);
    } catch (e: any) {
      alert(e.message || 'Failed to update profile');
    } finally {
      this.loading = false;
    }
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }
}
