import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './pages/home/home.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', component: HomeComponent },
  { 
    path: 'dashboard', 
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard],
    data: { title: 'Dashboard' }
  },
  { 
    path: 'settings', 
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'team', 
    loadChildren: () => import('./pages/team/team.module').then(m => m.TeamModule),
    canActivate: [AuthGuard]
  },
  { path: 'pricing', component: PricingComponent, data: { title: 'Pricing' } },
  { path: 'login', component: LoginComponent, data: { title: 'Sign In' } },
  { path: 'signup', component: SignupComponent, data: { title: 'Create Account' } },
  { path: 'forgot-password', component: ForgotPasswordComponent, data: { title: 'Reset Password' } },
  // Backward compatibility for old routes that are now sub-routes of dashboard
  { path: 'projects', redirectTo: 'dashboard/projects' },
  { path: 'call-sheets', redirectTo: 'dashboard/call-sheets' },
  { path: 'schedules', redirectTo: 'dashboard/schedules' },
  { path: 'script-analyzer', redirectTo: 'dashboard/script-analyzer' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
