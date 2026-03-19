import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { TeamService } from '../../services/team.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userName = 'Guest User';
  userInitials = 'GU';
  isOpen = false;

  constructor(
    private auth: AuthService, 
    private ui: UiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.currentUser.subscribe((user: any) => {
      if (user) {
        this.userName = (user.user_metadata as any).full_name || 'User';
        this.userInitials = this.userName.substring(0, 2).toUpperCase();
      }
    });

    this.ui.isSidebarOpen$.subscribe((open: boolean) => {
      this.isOpen = open;
    });

    // Close sidebar on navigation (mobile)
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.ui.closeSidebar();
    });
  }

  toggleSidebar() {
    this.ui.toggleSidebar();
  }

  async logout() {
    await this.auth.signOut();
  }

  toggleAiChat() {
    this.ui.toggleChatbot();
  }
}
