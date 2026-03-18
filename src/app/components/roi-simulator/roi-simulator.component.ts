import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roi-simulator',
  templateUrl: './roi-simulator.component.html',
  styleUrls: ['./roi-simulator.component.css']
})
export class RoiSimulatorComponent implements OnInit {
  targetMarket = 'Domestic High';
  genre = 'Sci-Fi Thriller';
  castingTier = 'A-List Indie';
  simulatedROI = 0;
  riskScore = 'Neutral';

  constructor() { }

  ngOnInit(): void {
  }

  simulate() {
    // Simulate complex financial logic
    const base = this.genre === 'Horror' ? 3.5 : 2.1;
    const tierMultiplier = this.castingTier === 'Major Star' ? 1.8 : 1.2;
    this.simulatedROI = base * tierMultiplier;
    this.riskScore = this.simulatedROI > 4 ? 'Very Low' : 'Moderate';
  }
}
