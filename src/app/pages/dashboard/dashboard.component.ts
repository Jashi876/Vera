import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { AuthService } from 'src/app/services/auth.service';
import { GeminiService } from 'src/app/services/gemini.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName = 'Filmmaker';
  stats = {
    activeProjects: 0,
    shootDays: 0,
    teamMembers: 0,
    aiOptimization: 0
  };

  timelineDays: any[] = [];
  activities: any[] = [];

  goldenHour = { start: '18:14', end: '19:22' };
  weatherAlert = '';
  coverSetAdvised = false;

  aiStatus: { success?: boolean, message?: string } | null = null;
  isTestingAi = false;
  isAnalyzing = false;

  constructor(
    private projectService: ProjectService, 
    private authService: AuthService,
    private gemini: GeminiService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.userName = (user.user_metadata as any).full_name || 'Filmmaker';
      }
    });

    // Fetch Dashboard Stats as Observable
    this.projectService.getDashboardStats().subscribe(stats => {
      this.stats = stats;
    });

    // Auto-check AI on load
    this.testAiConnection();
    this.fetchEnvironmentalIntel();
  }

  async fetchEnvironmentalIntel() {
    const today = new Date().toISOString().split('T')[0];
    const intel = await this.gemini.getEnvironmentalIntelligence('Current Location', today);
    this.goldenHour = intel.goldenHour;
    if (intel.weather.prob > 40) {
      this.weatherAlert = `${intel.weather.prob}% Rain chance. Recommended Cover Set: ${intel.interiorAlternatives[0]}`;
      this.coverSetAdvised = intel.coverSetAdvised;
    }
  }

  async testAiConnection() {
    this.isTestingAi = true;
    try {
      this.aiStatus = await this.gemini.testConnection();
    } finally {
      this.isTestingAi = false;
    }
  }

  async runNeuralBreakdown() {
    this.isAnalyzing = true;
    try {
      const result = await this.gemini.analyzeScript("Sample: Exterior City Street. Rain pours. A car screeches.");
      // console.log('Neural Breakdown Result:', result);
      alert('AI Breakdown Complete!');
    } catch (e) {
      alert('Breakdown failed. Check API configuration.');
    } finally {
      this.isAnalyzing = false;
    }
  }
}
