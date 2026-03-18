import { Component, OnInit } from '@angular/core';
import { GeminiService } from 'src/app/services/gemini.service';

@Component({
  selector: 'app-storyboard-pre-viz',
  templateUrl: './storyboard-pre-viz.component.html',
  styleUrls: ['./storyboard-pre-viz.component.css']
})
export class StoryboardPreVizComponent implements OnInit {
  sceneDescription = '';
  isGenerating = false;
  storyboards: any[] = [];

  constructor(private gemini: GeminiService) { }

  ngOnInit(): void {
  }

  async generateBoards() {
    this.isGenerating = true;
    this.storyboards = [];
    
    try {
      this.storyboards = await this.gemini.generateStoryboards(this.sceneDescription);
    } catch (e) {
      alert('Failed to generate storyboards');
    } finally {
      this.isGenerating = false;
    }
  }
}
