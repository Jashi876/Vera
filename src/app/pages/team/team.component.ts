import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  searchEmail = '';
  searchLoading = false;
  searchError = '';
  foundUser: any = null;
  
  teamMembers: any[] = [];

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
  }

  async handleSearch() {
    if (!this.searchEmail) return;
    
    this.searchLoading = true;
    this.searchError = '';
    this.foundUser = null;

    try {
      const { data, error } = await firstValueFrom(this.teamService.findUserByEmail(this.searchEmail));
      if (error || !data) {
        this.searchError = 'Unable to find user with this email.';
      } else {
        this.foundUser = data;
      }
    } catch (e) {
      this.searchError = 'An error occurred while searching.';
    } finally {
      this.searchLoading = false;
    }
  }

  addMember() {
    if (this.foundUser) {
      this.teamMembers.push({
        name: this.foundUser.full_name || 'New Member',
        role: 'Member',
        email: this.foundUser.email,
        avatar: (this.foundUser.full_name || 'NM').substring(0, 2).toUpperCase(),
        status: 'Invited'
      });
      this.foundUser = null;
      this.searchEmail = '';
    }
  }
}
