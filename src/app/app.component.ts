import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'vera';
  isDashboard = false;
  private readonly dashboardRoutePrefixes = ['/dashboard', '/settings', '/team'];

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private ui: UiService
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const currentUrl = event.urlAfterRedirects || event.url;
      this.isDashboard = this.dashboardRoutePrefixes.some(route => currentUrl.startsWith(route));
      
      // Dynamic Title Logic
      let child = this.activatedRoute.firstChild;
      while (child?.firstChild) {
        child = child.firstChild;
      }
      const pageTitle = child?.snapshot.data['title'] || 'Production Assistant';
      this.titleService.setTitle(`VERA | ${pageTitle}`);
    });
  }

  toggleSidebar() {
    this.ui.toggleSidebar();
  }
}
