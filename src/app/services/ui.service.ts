import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private _isChatbotOpen = new BehaviorSubject<boolean>(false);
  isChatbotOpen$ = this._isChatbotOpen.asObservable();

  private _isSidebarOpen = new BehaviorSubject<boolean>(false);
  isSidebarOpen$ = this._isSidebarOpen.asObservable();

  constructor() { }

  toggleChatbot() {
    this._isChatbotOpen.next(!this._isChatbotOpen.value);
  }

  toggleSidebar() {
    this._isSidebarOpen.next(!this._isSidebarOpen.value);
  }

  closeSidebar() {
    this._isSidebarOpen.next(false);
  }

  openChatbot() {
    this._isChatbotOpen.next(true);
  }

  closeChatbot() {
    this._isChatbotOpen.next(false);
  }
}
