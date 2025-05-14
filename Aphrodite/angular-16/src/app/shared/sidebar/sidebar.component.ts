import { Component, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  public sidebarnavItems: RouteInfo[] = [];
  public role: string | null = null;
  public showMenu = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.role = this.authService.getRole();
    this.filterSidebarByRole();
  }

  toggleMenu(menu: string): void {
    this.showMenu = this.showMenu === menu ? '' : menu;
  }

  private filterSidebarByRole(): void {
    const allowedTopLevels: string[] = [];
    const allowedSubmenus: { [key: string]: string[] } = {};

    switch (this.role) {
      case 'super-manager':
        this.sidebarnavItems = ROUTES;
        return;

      case 'sales-manager':
        allowedTopLevels.push(
          'The Team', 'Predict Revenue', 'Sentiment Review',
           'Sales Dashboard', 'Sales 2 Dashboard',
          'Clustering Dashboard', 'Sales Management'
        );
        allowedSubmenus['Sales Management'] = [
          'Sentiment Review', 'ARIMA Forecast', 'Régression B-Linéaire'
        ];
        break;

      case 'production-manager':
        allowedTopLevels.push(
          'The Team', 'Production Dashboard', 'Clustering Dashboard', 'Production Management'
        );
        allowedSubmenus['Production Management'] = [
          'Classification Prod.', 'Régression Prod.', 'Prévision Production',
          '🧴 Cosmétiques (CNN)', '🎯 Recommandation Prod.'
        ];
        break;

      case 'stock-manager':
        allowedTopLevels.push(
          'The Team', 'BI Overview', 'Stock Dashboard', 'Clustering Dashboard', 'Stock Management','Box Classifier'
        );
        allowedSubmenus['Stock Management'] = [
          'The Team','Classification Stock', 'Clustering Stock', 'Régression Stock', 'Recommandation Stock', 'Box Classifier'
        ];
        break;

      default:
        this.sidebarnavItems = [];
        return;
    }

    this.sidebarnavItems = ROUTES.filter(item => {
      if (item.submenu.length === 0) {
        return allowedTopLevels.includes(item.title);
      } else {
        const filteredSubmenu = item.submenu.filter(sub =>
          allowedSubmenus[item.title]?.includes(sub.title)
        );
        item.submenu = filteredSubmenu;
        return allowedTopLevels.includes(item.title) && filteredSubmenu.length > 0;
      }
    });
  }
}
