import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ProjectsComponent } from '../projects/projects.component';
import { CallSheetsComponent } from '../call-sheets/call-sheets.component';
import { SchedulesComponent } from '../schedules/schedules.component';
import { BurnRateTrackerComponent } from '../../components/burn-rate-tracker/burn-rate-tracker.component';
import { RoiSimulatorComponent } from '../../components/roi-simulator/roi-simulator.component';
import { StoryboardPreVizComponent } from '../../components/storyboard-pre-viz/storyboard-pre-viz.component';
import { ScriptAnalyzerComponent } from '../script-analyzer/script-analyzer.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'projects', component: ProjectsComponent, data: { title: 'Projects' } },
  { path: 'call-sheets', component: CallSheetsComponent, data: { title: 'Call Sheets' } },
  { path: 'schedules', component: SchedulesComponent, data: { title: 'Schedules' } },
  { path: 'script-analyzer', component: ScriptAnalyzerComponent, data: { title: 'Script Analyzer' } }
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
    ScriptAnalyzerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
