import { Component, OnInit } from '@angular/core';
import { GeminiService } from 'src/app/services/gemini.service';

@Component({
  selector: 'app-script-analyzer',
  templateUrl: './script-analyzer.component.html',
  styleUrls: ['./script-analyzer.component.css']
})
export class ScriptAnalyzerComponent implements OnInit {
  scriptText: string = '';
  isAnalyzing: boolean = false;
  isVisualizing: boolean = false;
  analysisResult: any = null;
  selectedScene: any = null;
  visualData: any = null;
  analysisStatus: string = '';
  error: string = '';

  constructor(private gemini: GeminiService) { }

  ngOnInit(): void {
  }

  async analyzeScript() {
    if (!this.scriptText || this.scriptText.trim().length < 20) {
      this.error = 'Please enter a substantial script excerpt for analysis.';
      return;
    }

    this.isAnalyzing = true;
    this.error = '';
    this.analysisResult = null;
    this.selectedScene = null;
    this.analysisStatus = 'Initializing Neural Networks...';

    try {
      this.analysisResult = await this.gemini.analyzeScript(this.scriptText, (msg) => {
        this.analysisStatus = msg;
      });
    } catch (e: any) {
      this.error = 'Analysis failed. Please try again.';
      console.error(e);
    } finally {
      this.isAnalyzing = false;
      this.analysisStatus = '';
    }
  }

  async openVisualization(scene: any) {
    this.selectedScene = scene;
    this.isVisualizing = true;
    this.visualData = null;

    const sceneDesc = `Scene ${scene.id}: ${scene.title}. Cast: ${scene.characters?.join(', ')}. Details: ${scene.props?.join(', ')}`;
    
    try {
      this.visualData = await this.gemini.generateStoryboards(sceneDesc);
    } catch (e) {
      console.error('Visualization failed:', e);
    } finally {
      this.isVisualizing = false;
    }
  }

  closeVisualization() {
    this.selectedScene = null;
    this.visualData = null;
  }

  clearAll() {
    this.scriptText = '';
    this.analysisResult = null;
    this.selectedScene = null;
    this.error = '';
  }
}
