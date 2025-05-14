import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  public showSearch = false;
  public currentUsername: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUsername = this.authService.getCurrentUsername();
  }

  switchAccount(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); //  vers login
  }
}
