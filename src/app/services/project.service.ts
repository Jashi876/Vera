import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { AuthService } from './auth.service';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private supabase: SupabaseService, private auth: AuthService) {}

  getProjects(): Observable<any> {
    const user = this.auth.session?.user;
    if (!user) return of({ data: [], error: null });

    return from(this.supabase.client
      .from('projects')
      .select('*')
      .eq('owner_id', user.id)
      .order('created_at', { ascending: false })
    );
  }

  createProject(project: any): Observable<any> {
    const user = this.auth.session?.user;
    if (!user) {
      return of({ data: null, error: new Error('User not authenticated') });
    }

    const projectData = {
      title: project.title,
      owner_id: user.id
    };

    return from(this.supabase.client
      .from('projects')
      .insert([projectData])
      .select()
    );
  }

  updateProject(id: string, updates: any): Observable<any> {
    const user = this.auth.session?.user;
    if (!user) return of({ data: null, error: new Error('Unauthorized') });

    const updatesData: any = {};
    if (updates.title) updatesData.title = updates.title;

    return from(this.supabase.client
      .from('projects')
      .update(updatesData)
      .eq('id', id)
      .eq('owner_id', user.id)
      .select()
    );
  }

  deleteProject(id: string): Observable<any> {
    const user = this.auth.session?.user;
    if (!user) return of({ data: null, error: new Error('Unauthorized') });

    return from(this.supabase.client
      .from('projects')
      .delete()
      .eq('id', id)
      .eq('owner_id', user.id)
    );
  }

  getDashboardStats(): Observable<any> {
    return this.getProjects().pipe(
      map(({ data: projects }) => ({
        activeProjects: projects?.length ?? 0,
        shootDays: 0,
        teamMembers: 0,
        aiOptimization: 0
      }))
    );
  }
}
