import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openDemo() {
    const el = document.getElementById('product-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
