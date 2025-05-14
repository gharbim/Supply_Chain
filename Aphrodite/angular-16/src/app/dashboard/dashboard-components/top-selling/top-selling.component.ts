import { Component, OnInit } from '@angular/core';
import { TeamMember, Team }       from './top-selling-data';  

@Component({
  selector: 'app-top-selling',
  templateUrl: './top-selling.component.html'
})
export class TopSellingComponent implements OnInit {
  teamMembers: TeamMember[] = [];

  constructor() {
    // load the data array
    this.teamMembers = Team;
  }

  ngOnInit(): void {}
}
