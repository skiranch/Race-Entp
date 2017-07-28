import {Component, ElementRef } from '@angular/core';
import { saveAs } from 'file-saver';

// import { TabsComponent } from '../tabs/tabs.component';
import { LeftpaneComponent } from '../leftpane/leftpane.component';
import { ShowHideSharedService } from '../show-hide-shared.service';
import { NgForm } from '@angular/forms';
import { SortableContainer } from 'ng2-dnd';

import { HeaderComponent } from '../header/header.component'
import { FooterComponent } from '../footer/footer.component'

declare var jQuery: any;

@Component({
    selector: 'app-devicepage',
    templateUrl: './devicepage.component.html',
    styleUrls: ['./devicepage.component.scss'],
    providers:[ShowHideSharedService, SortableContainer]
})

export class DevicepageComponent {
    simpleDrop: any = null;

    constructor(public sh: ShowHideSharedService, private element: ElementRef) {}

    receivedData: Array<any> = [];

    transferDataSuccess($event: any) {
        this.receivedData.push($event);
    }
    

    downloadJSON() {
        console.log('Downloading...');
        let formatToJson = JSON.stringify(this.receivedData);
        saveAs(new Blob([formatToJson], { type: "application/json" }), 'data.json');
        //console.log(formatToJson);
    }

    ShowJson(){
        console.log(JSON.stringify(this.receivedData));
    }

    //New functions
    public isFullScreenActive: boolean = false;
    public rotate: boolean = false;
    public filling: boolean = false;
    
    fullScreen(){
        this.isFullScreenActive = !this.isFullScreenActive;
        this.sh.hide();
    }

    rotateScreen(val){
        this.rotate=!this.rotate
    }

    changeDevice(val){
        console.log(val);
    }

    ShowProperties(formContainer, elm){
        jQuery(".tabs__properties").hide();
        jQuery('.device-area__dragged-items div').removeClass('device-area__highlight');

        console.log(':::::'+ formContainer);
        jQuery("."+formContainer).show();
        if(elm != undefined){
            jQuery(elm).toggleClass('device-area__highlight');
        }
        
    }

    ShowHidePanel(formContainer){
        jQuery('.'+formContainer).slideUp('800');
        jQuery('.device-area__dragged-items div').removeClass('device-area__highlight');
    }

    textComponent: Array<any> = [{
                                "id": "ft" + new Date().getTime(), "type": "text", "name": "textName", "schema": "textInputSchema", 
                                "properties": [] }];

    selectComponent: Array<any> = [{
                                "id": "ft" + new Date().getTime(), "type": 'select', "name": "selectName", "schema": "selectInputSchema", 
                                "properties": [] }];

    dateComponent: Array<any> = [{
                                "id": "ft" + new Date().getTime(), "type": 'date', "name": "dateName", "schema": "dateInputSchema", 
                                "properties": [] }];

    addTextProperties(form: NgForm) {
        this.textComponent[0].properties.push(form.value);
        console.log(this.textComponent[0])

    }

    addSelectProperties(form: NgForm) {
        this.selectComponent[0].properties.push(form.value);
        console.log(this.selectComponent[0])
        
    }

    addDateProperties(form: NgForm) {
        this.dateComponent[0].properties.push(form.value);
        console.log(this.dateComponent[0])
        
    }

    public fileName: string = 'default-logo.png'; 
    getFiles(fileInput: any){ 
        let file = fileInput.target.files[0];
        this.fileName = file.name;
        console.log(this.fileName);
    } 

    addLoginFormProperties(form: NgForm){
        form.value.logo = this.fileName;
        this.receivedData[0].dragData[0].properties.push(form.value);
    }
}
