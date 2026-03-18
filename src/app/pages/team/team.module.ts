import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: TeamComponent }
];

@NgModule({
  declarations: [TeamComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class TeamModule { }
