import { Component, OnInit } from '@angular/core';
import { GeminiService } from 'src/app/services/gemini.service';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-call-sheets',
  templateUrl: './call-sheets.component.html',
  styleUrls: ['./call-sheets.component.css']
})
export class CallSheetsComponent implements OnInit {

  isDownloading = false;
  activeProject: any = null;
  weatherIntel: any = null;
  goldenHour: any = null;

  constructor(private gemini: GeminiService, private supabase: SupabaseService) { }

  ngOnInit(): void {
    this.loadProjectData();
    this.loadEnvironmentalIntel();
  }

  async loadProjectData() {
    // For now, get the first project or a default
    // In production, this would come from a route param or state service
    const { data } = await this.supabase.client
      .from('projects')
      .select('*')
      .limit(1)
      .single();
    if (data) this.activeProject = data;
  }

  async loadEnvironmentalIntel() {
    const today = new Date().toISOString().split('T')[0];
    const result = await this.gemini.getEnvironmentalIntelligence('Abandoned Warehouse, NY', today);
    this.weatherIntel = result.weather;
    this.goldenHour = result.goldenHour;
  }

  simulateDownload() {
    this.isDownloading = true;
    setTimeout(() => {
      this.isDownloading = false;
      alert('Call Sheet PDF generated. Your download will start shortly.');
    }, 2000);
  }

}
