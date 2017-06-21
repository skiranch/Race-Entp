import { Component } from '@angular/core';
import { Router } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'app-designer-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent {
  //jsonData = DevicepageComponent

  changeDevice(id){
    jQuery('.device__list li').removeClass('selected');
    if(id == "iphone-5"){
      jQuery('#'+id).toggleClass('selected');
      jQuery('.phone-area').removeClass('iphone-6 iphone-7');
      jQuery('.phone-area').addClass('iphone-5');
    }
    else if(id == "iphone-6"){
      jQuery('#'+id).toggleClass('selected');
      jQuery('.phone-area').removeClass('iphone-5 iphone-7');
      jQuery('.phone-area').addClass('iphone-6 selected');
    }
    else if(id == "iphone-7"){
      jQuery('#'+id).toggleClass('selected');
      jQuery('.phone-area').removeClass('iphone-6 iphone-5');
      jQuery('.phone-area').addClass('iphone-7 selected');
    }
  }
}