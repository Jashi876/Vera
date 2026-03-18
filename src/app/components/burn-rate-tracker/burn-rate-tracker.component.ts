import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-burn-rate-tracker',
  templateUrl: './burn-rate-tracker.component.html',
  styleUrls: ['./burn-rate-tracker.component.css']
})
export class BurnRateTrackerComponent implements OnInit {
  currentHourlyBurn = 0; 
  dailyBudget = 0;
  totalSpentToday = 0;
  delayHours = 0;
  potentialLoss = 0;

  constructor() { }

  ngOnInit(): void {
  }

  updateDelay(hours: number) {
    this.delayHours = hours;
    this.potentialLoss = this.currentHourlyBurn * hours;
  }
}
