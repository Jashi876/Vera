import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ProjectsComponent } from '../projects/projects.component';
import { CallSheetsComponent } from '../call-sheets/call-sheets.component';
import { SchedulesComponent } from '../schedules/schedules.component';
import { BurnRateTrackerComponent } from '../../components/burn-rate-tracker/burn-rate-tracker.component';
import { RoiSimulatorComponent } from '../../components/roi-simulator/roi-simulator.component';
import { StoryboardPreVizComponent } from '../../components/storyboard-pre-viz/storyboard-pre-viz.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'call-sheets', component: CallSheetsComponent },
  { path: 'schedules', component: SchedulesComponent }
];

@NgModule({
  declarations: [
    DashboardComponent,
    ProjectsComponent,
    CallSheetsComponent,
    SchedulesComponent,
    BurnRateTrackerComponent,
    RoiSimulatorComponent,
    StoryboardPreVizComponent,
    StoryboardPreVizComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
