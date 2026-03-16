import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  modalOpen = false;
  showToast = false;

  projects = [
    {
      title: 'Midnight Horizon',
      status: 'Production',
      scenes: 124,
      nextShoot: 'Mar 18',
      progress: 45,
      image: 'https://images.unsplash.com/photo-1542204172-3c1f10bc4906?auto=format&fit=crop&q=80&w=400'
    },
    {
      title: 'The Silent Script',
      status: 'Pre-Production',
      scenes: 86,
      nextShoot: 'Apr 02',
      progress: 12,
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=400'
    },
    {
      title: 'Urban Legends',
      status: 'Optimization',
      scenes: 210,
      nextShoot: 'Mar 25',
      progress: 78,
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=400'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    this.modalOpen = false;
    this.showToast = true;
    
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }

}
