import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private supabase: SupabaseService, private auth: AuthService) {}

  async getProjects() {
    const user = this.auth.session?.user;
    if (!user) return { data: [], error: null };

    const { data, error } = await this.supabase.client
      .from('projects')
      .select('*')
      .eq('owner_id', user.id)
      .order('created_at', { ascending: false });
    
    return { data, error };
  }

  async createProject(project: any) {
    const user = this.auth.session?.user;
    if (!user) throw new Error('User not authenticated');

    const projectData = {
      title: project.title,
      status: project.status || 'Pre-Production',
      owner_id: user.id
    };

    const { data, error } = await this.supabase.client
      .from('projects')
      .insert([projectData])
      .select();
    
    return { data, error };
  }

  async updateProject(id: string, updates: any) {
    const updatesData: any = {};
    if (updates.title) updatesData.title = updates.title;
    if (updates.status) updatesData.status = updates.status;

    const { data, error } = await this.supabase.client
      .from('projects')
      .update(updatesData)
      .eq('id', id)
      .select();
    
    return { data, error };
  }

  async deleteProject(id: string) {
    const { error } = await this.supabase.client
      .from('projects')
      .delete()
      .eq('id', id);
    
    return { error };
  }

  async getDashboardStats() {
    // This would be more complex in real production, but for now:
    const { data: projects } = await this.getProjects();
    return {
      activeProjects: projects?.length ?? 0,
      shootDays: 0,
      teamMembers: 0,
      aiOptimization: 0
    };
  }
}
