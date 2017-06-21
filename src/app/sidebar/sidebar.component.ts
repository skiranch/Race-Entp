import { Component, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { Location } from '@angular/common';

declare var jQuery: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public location = '' ;
  constructor(location: Location) { 
      this.location = location.path();
  }

  ngOnInit() {
  }

  toggleSidebar(){
      event.preventDefault();
      jQuery(".wrapper").toggleClass("active");
      jQuery('#main_icon').toggleClass('open');
  }

}
