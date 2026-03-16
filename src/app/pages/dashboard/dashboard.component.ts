import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  timelineDays = [
    { name: 'Mon', event: 'Sc 12-15 Shooting', progress: 80, color: 'var(--purple)' },
    { name: 'Tue', event: 'Sc 42A Breakdown', progress: 40, color: 'var(--neon-blue)' },
    { name: 'Wed', event: 'Pre-production Meeting', progress: 20, color: 'var(--neon-cyan)' },
    { name: 'Thu', event: 'Location Scouting', progress: 90, color: 'var(--neon-violet)' },
    { name: 'Fri', event: 'Sc 55 Casting', progress: 60, color: 'var(--purple-light)' }
  ];

  activities = [
    { user: 'Sarah AD', action: 'updated the call sheet for Project X', time: '2 mins ago', color: '#7c3aed' },
    { user: 'Mike Prod', action: 'uploaded a new script draft', time: '45 mins ago', color: '#3b82f6' },
    { user: 'AI Engine', action: 'completed schedule optimization', time: '2 hours ago', color: '#06b6d4' },
    { user: 'John Director', action: 'approved Scene 42A', time: '5 hours ago', color: '#34d399' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
