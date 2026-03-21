import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './supabase.service';
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { BehaviorSubject, Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser = new BehaviorSubject<User | null>(null);
  private _session = new BehaviorSubject<Session | null>(null);

  constructor(private supabase: SupabaseService, private router: Router) {
    this.supabase.client.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      this._session.next(session);
      this._currentUser.next(session?.user ?? null);
      
      if (event === 'SIGNED_OUT') {
        this.router.navigate(['/login']);
      }
    });
  }

  get currentUser(): Observable<User | null> {
    return this._currentUser.asObservable();
  }

  get session(): Session | null {
    return this._session.value;
  }

  signUp(email: string, password: string, metadata: any = {}): Observable<any> {
    return from(this.supabase.client.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    }));
  }

  signIn(email: string, password: string): Observable<any> {
    return from(this.supabase.client.auth.signInWithPassword({
      email,
      password,
    }));
  }

  async signInWithGoogle() {
    return await this.supabase.client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard'
      }
    });
  }

  async resetPassword(email: string) {
    return await this.supabase.client.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/settings'
    });
  }

  signOut(): Observable<any> {
    return from(this.supabase.client.auth.signOut());
  }

  async updateProfile(updates: any) {
    const user = this._currentUser.value;
    if (!user) throw new Error('No user logged in');

    const { error } = await this.supabase.client
      .from('profiles')
      .upsert({
        id: user.id,
        ...updates,
        updated_at: new Date()
      });
    
    return { error };
  }
}
