import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  public isOpen$ = this.isOpenSubject.asObservable();

  constructor() {
    // Rendre le service accessible globalement pour qu'il puisse être appelé depuis d'autres components
    (window as any).chatbotService = this;
  }

  openChatbot(): void {
    this.isOpenSubject.next(true);
  }

  closeChatbot(): void {
    this.isOpenSubject.next(false);
  }

  toggleChatbot(): void {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }
}