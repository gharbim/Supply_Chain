import { CommonModule } from "@angular/common";
import { Component, OnInit, HostListener } from "@angular/core";
import { Router, RouterModule, NavigationEnd } from "@angular/router";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";
import { NavigationComponent } from "src/app/shared/header/navigation.component";
import { SidebarComponent } from "src/app/shared/sidebar/sidebar.component";
import { filter } from "rxjs";

@Component({
  selector: "app-full-layout",
  standalone: true,
  imports: [
    RouterModule,
    SidebarComponent,
    NavigationComponent,
    CommonModule,
    NgbCollapseModule
  ],
  templateUrl: "./full.component.html",
  styleUrls: ["./full.component.scss"]
})
export class FullComponent implements OnInit {
  public isCollapsed = false;
  public innerWidth: number = 0;
  public defaultSidebar: string = "";
  public showMobileMenu = false;
  public expandLogo = false;
  public sidebartype: string = "full";
  public openMenu: string | null = null;
  public showLayoutElements = true;

  constructor(public router: Router) {}

  ngOnInit(): void {
    if (this.router.url === "/") {
      this.router.navigate(["/dashboard"]);
    }

    this.defaultSidebar = this.sidebartype;
    this.handleSidebar();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.showLayoutElements = this.isLoggedIn();
      });
  }

  @HostListener("window:resize", ["$event"])
  onResize(): void {
    this.handleSidebar();
  }

  handleSidebar(): void {
    this.innerWidth = window.innerWidth;
    this.sidebartype = this.innerWidth < 1170 ? "full" : this.defaultSidebar;
  }

  toggleSidebarType(): void {
    this.sidebartype =
      this.sidebartype === "full" ? "mini-sidebar" : "full";
  }

  Logo(): void {
    this.expandLogo = !this.expandLogo;
  }

  toggleMenu(menu: string): void {
    this.openMenu = this.openMenu === menu ? null : menu;
  }

  isLoggedIn(): boolean {
    return this.router.url !== '/login';
  }
}