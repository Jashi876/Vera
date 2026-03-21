import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { AuthService } from './auth.service';
import { from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private supabase: SupabaseService) { }

  findUserByEmail(email: string): Observable<any> {
    return from(this.supabase.client
      .from('profiles')
      .select('*')
      .ilike('email', email)
      .maybeSingle()
    );
  }

  addMemberToProject(projectId: string, userId: string, role: string = 'Member'): Observable<any> {
    return from(this.supabase.client
      .from('project_members')
      .insert([
        { project_id: projectId, user_id: userId, role: role }
      ])
    );
  }

  getProjectTeam(projectId: string): Observable<any> {
    return from(this.supabase.client
      .from('project_members')
      .select('*, profiles(*)')
      .eq('project_id', projectId)
    );
  }
}
