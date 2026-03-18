import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private supabase: SupabaseService) { }

  async findUserByEmail(email: string) {
    // This assumes we have a 'profiles' table that links to auth.users
    const { data, error } = await this.supabase.client
      .from('profiles')
      .select('*')
      .ilike('email', email)
      .maybeSingle();
    
    return { data, error };
  }

  async addMemberToProject(projectId: string, userId: string, role: string = 'Member') {
    const { data, error } = await this.supabase.client
      .from('project_members')
      .insert([
        { project_id: projectId, user_id: userId, role: role }
      ]);
    
    return { data, error };
  }

  async getProjectTeam(projectId: string) {
    const { data, error } = await this.supabase.client
      .from('project_members')
      .select('*, profiles(*)')
      .eq('project_id', projectId);
    
    return { data, error };
  }
}
