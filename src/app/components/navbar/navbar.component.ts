import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  mobileMenuOpen = false;
  user: User | null = null;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  async logout() {
    await this.auth.signOut();
  }
}
