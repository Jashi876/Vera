import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  modalOpen = false;
  isEditMode = false;
  editingProjectId: string | null = null;
  showToast = false;
  loading = false;
  
  newProject = {
    title: '',
    status: 'Pre-Production',
    scenes: 0,
    progress: 0
  };

  projects: any[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  async loadProjects() {
    this.loading = true;
    const { data, error } = await this.projectService.getProjects();
    this.projects = data || [];
    this.loading = false;
  }

  getMockProjects() {
    return [
      {
        title: 'Midnight Horizon',
        status: 'Production',
        scenes: 124,
        next_shoot: 'Mar 18',
        progress: 45,
        image: 'https://images.unsplash.com/photo-1542204172-3c1f10bc4906?auto=format&fit=crop&q=80&w=400'
      },
      {
        title: 'The Silent Script',
        status: 'Pre-Production',
        scenes: 86,
        next_shoot: 'Apr 02',
        progress: 12,
        image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=400'
      }
    ];
  }

  openModal(project?: any) {
    if (project) {
      this.isEditMode = true;
      this.editingProjectId = project.id;
      this.newProject = { ...project };
    } else {
      this.isEditMode = false;
      this.editingProjectId = null;
      this.newProject = {
        title: '',
        status: 'Pre-Production',
        scenes: 0,
        progress: 0
      };
    }
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  async handleSubmit(event: Event) {
    event.preventDefault();
    this.loading = true;
    try {
      let result;
      if (this.isEditMode && this.editingProjectId) {
        result = await this.projectService.updateProject(this.editingProjectId, this.newProject);
      } else {
        result = await this.projectService.createProject(this.newProject);
      }
      
      if (result.error) throw result.error;
      
      this.modalOpen = false;
      this.showToast = true;
      this.loadProjects();
      
      setTimeout(() => {
        this.showToast = false;
      }, 4000);
    } catch (e: any) {
      alert(e.message || 'Failed to process project');
    } finally {
      this.loading = false;
    }
  }

  async deleteProject(id: string) {
    if (confirm('Are you sure you want to delete this project?')) {
      const { error } = await this.projectService.deleteProject(id);
      if (error) {
        alert('Failed to delete project');
      } else {
        this.loadProjects();
      }
    }
  }

}
