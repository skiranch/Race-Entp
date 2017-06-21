import { Component, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.scss']
})


export class TopmenuComponent implements OnInit {
  
  public location = '' ;

  constructor(location: Location) { 
      this.location = location.path();

  }

  ngOnInit() {
  }


}
