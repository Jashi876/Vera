import { Component, OnInit } from '@angular/core';
import { GeminiService } from 'src/app/services/gemini.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
  activeView = 'list';
  isAnalyzing = false;
  isOptimizing = false;
  optimizationResult: any = null;
  
  scenes: any[] = [];

  constructor(private gemini: GeminiService) { }

  ngOnInit(): void {
  }

  async runNeuralBreakdown() {
    this.isAnalyzing = true;
    try {
      const result = await this.gemini.analyzeScript('Simulated Script Content...') as any;
      if (result && result.scenes) {
        this.scenes = result.scenes.map((s: any) => ({
          ...s,
          status: (s.risks || []).includes('High-Risk') ? 'Action Required' : 'Ready',
          hazards: Array.isArray(s.risks) ? s.risks.join(', ') : 'None'
        }));
        
        console.log('Safety Analysis:', result.safetyAnalysis);
        if (result.safetyAnalysis) {
          alert(result.safetyAnalysis.riskSummary || 'Analysis complete');
        }
      }
    } catch (e) {
      alert('Analysis failed');
    } finally {
      this.isAnalyzing = false;
    }
  }

  async runOptimization() {
    this.isOptimizing = true;
    this.optimizationResult = null;
    
    try {
      const result = await this.gemini.optimizeSchedule(this.scenes, { unionRestPeriod: 12 });
      this.optimizationResult = result;
      
      // Implement "Union-Aware" repair logic
      this.scenes = this.scenes.map(s => {
        if (s.restPeriod < 12) {
          const shiftAmount = 12 - s.restPeriod;
          console.log(`Union Turnaround Guard: Shifting ${s.title} by ${shiftAmount}h`);
          return { 
            ...s, 
            status: 'Repaired (Union Guard)', 
            restPeriod: 12,
            callTimeShift: `+${shiftAmount}h`
          };
        }
        return s;
      });

      alert(`Schedule Optimized!\n- Efficiency: +${result.efficiencyBoost}%\n- Travel Saved: ${result.travelSaved}\n- Union Conflicts Repaired: ${result.conflictRepairs}`);
    } catch (e) {
      alert('Optimization failed');
    } finally {
      this.isOptimizing = false;
    }
  }

  setView(view: string) {
    this.activeView = view;
  }
}
