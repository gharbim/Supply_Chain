import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_KEY = 'aphrodite-user';

  private users = [
    { username: 'admin', password: 'admin123', role: 'super-manager' },
    { username: 'stock', password: 'stock123', role: 'stock-manager' },
    { username: 'prod', password: 'prod123', role: 'production-manager' },
    { username: 'sales', password: 'sales123', role: 'sales-manager' }
  ];

  constructor() {}

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  getCurrentUsername(): string {
    const user = this.getCurrentUser();
    return user ? user.username : '';
  }

  getRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  private getCurrentUser(): any {
    const data = localStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  }
}
