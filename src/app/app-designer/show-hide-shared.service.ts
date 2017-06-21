import {Injectable} from '@angular/core';

export interface showHide {
   show:boolean;
}

@Injectable()
export class ShowHideSharedService {
  showhide:showHide={show:false};

  hide(){
    this.showhide.show=!this.showhide.show;
  }
}