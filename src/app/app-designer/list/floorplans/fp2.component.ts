import { Component, NgModule, Input } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { AppDesignerJSON } from '../../globals';
import { FormlyFieldConfig } from 'ng-formly';
import { Router } from '@angular/router';

// services
import { DataSourceService } from './services/data-source.service'
import { ConnectionProviderService } from './services/connection-provider.service'
import { APIListService } from './services/APIList.service'
import { ListOfFieldsService } from './services/listOfFields.service'
import { CPDPPostService } from './services/CPDP-post.service'
import { FloorplanUIPostService } from './services/floorplanUI-post.service'

//Json data
import * as data from './fp2.json'
const floorplanData = (<any>data);
console.log(floorplanData);

declare var jQuery: any;

@Component({
    templateUrl: `./fp2.component.html`,
    styleUrls: ['./scss/fp.component.scss', './scss/section.scss'],
    providers: [DataSourceService, ConnectionProviderService, APIListService, ListOfFieldsService, CPDPPostService, FloorplanUIPostService]
})

export class FP2Component {
    toggleButton: boolean = false;
    loading: boolean;
    connectionServiceDD: boolean = false;
    searchAPI: boolean = false;
    searchAPI2: boolean = false;
    apiListDD: boolean = false;
    apiListDD2: boolean = false;
    loadingApis: boolean = false;
    showFields: boolean = false;
    showFields2: boolean = false;
    success: boolean = false;
    
    public showPropertyPanel: boolean = false;
    public poSummaryPanel;
    public poHeaderPanel;
    public dataSource = [];
    public connectionProviders = [];
    public APIList = [];
    public APIList2 = [];
    public listOfFields = [];
    public listOfFields2 = [];
    

    private postData;

    apiVal: string
    systemId: string
    cpName: string
    selectedAPI: string;
    selectedAPI2: string;

    constructor(
        private router: Router,
        private _dataSourceService: DataSourceService,
        private _connectionProviderService: ConnectionProviderService,
        private _apiListService: APIListService,
        private _listOfFieldsService: ListOfFieldsService,
        private _cpdpPostService: CPDPPostService,
        private _floorplanUIPostService: FloorplanUIPostService

    ) { }

    //post request 1
    cpdpTotalAmmout = {
        "DPConfig": "[{\"label\":\"SummaryAmount\",\"position\":\"1\"}]",
        "Key": true,
        "ModuleID": "SES_CONF",
        "DataProvider": "",
        "FieldName": "", //* field name
        "APIName": "", // * api name
        "ParameterName": "", //* param name
        "Status": true, // always true
        "DataSource": "", //* system id
        "ConnectionProvider": "" //* cp name
    }

    //post request 2
    cpdpCurrencyType = {
        "DPConfig": "[{\"label\":\"CurrencyType\",\"position\":\"2\"}]",
        "Key": true,
        "ModuleID": "SES_CONF",
        "DataProvider": "",
        "FieldName": "", //* field name
        "APIName": "", // * api name
        "ParameterName": "", //* param name
        "Status": true, // always true
        "DataSource": "", //* system id
        "ConnectionProvider": "" //* cp name
    }

    //post request 3
    cpdpHeaderDesc = {
        "DPConfig": "[{\"label\":\"HeaderDesc\",\"position\":\"3\"}]",
        "Key": true,
        "ModuleID": "SES_CONF",
        "DataProvider": "",
        "FieldName": "", //* field name
        "APIName": "", // * api name
        "ParameterName": "", //* param name
        "Status": true, // always true
        "DataSource": "", //* system id
        "ConnectionProvider": "" //* cp name
    }

    //post request 4
    cpdpPurchasingDoc = {
        "DPConfig": "[{\"label\":\"\",\"position\":\"1\",\"uifieldtype\":\"\"}]",
        "Key": true,
        "ModuleID": "SES_CONF",
        "DataProvider": "",
        "FieldName": "", //* field name
        "APIName": "", // * api name
        "ParameterName": "", //* param name
        "Status": true, // always true
        "DataSource": "", //* system id
        "ConnectionProvider": "" //* cp name
    }

    //post request 5
    cpdpPurchasingOrg = {
        "DPConfig": "[{\"label\":\"\",\"position\":\"2\",\"uifieldtype\":\"\"}]",
        "Key": true,
        "ModuleID": "SES_CONF",
        "DataProvider": "",
        "FieldName": "", //* field name
        "APIName": "", // * api name
        "ParameterName": "", //* param name
        "Status": true, // always true
        "DataSource": "", //* system id
        "ConnectionProvider": "" //* cp name
    }

    //post request 6
    cpdpPurchasingVendor = {
        "DPConfig": "[{\"label\":\"\",\"position\":\"3\",\"uifieldtype\":\"\"}]",
        "Key": true,
        "ModuleID": "SES_CONF",
        "DataProvider": "",
        "FieldName": "", //* field name
        "APIName": "", // * api name
        "ParameterName": "", //* param name
        "Status": true, // always true
        "DataSource": "", //* system id
        "ConnectionProvider": "" //* cp name
    }

    FPConfigWrapper = {
        "AppID": "MINVENTORY",
        "ModuleID": "SES_CONF",
        "FPID": "FP_07_DOL_01",
        "FPName": "Floor Plan 2",
        "Status": "X",
        "FPConfg": ""
    }

    floorplan_new =
    {
        "id": 1, "floorName": "FP_07_DOL_01",
        "pageTitle": "Service Orders",
        "pageTitleColor": "#87A4B8",
        "headerColor": "#0000ff",
        "headerIconsColor": "#87A4B8",
        "header": {
            "left": [],
            "right": [{
                "elementTitle": "",
                "position": 1,
                "style": "{'textColor':'#87a4b8'}",
                "componentCategory": "BTN",
                "componentType": "DEFAULTSBTN",
                "dataprovider": "",
                "dataproviderType": "",
                "dataproviderParameters": "",
                "dpParameters": "",
                "navigation": ""
            },
            {
                "elementTitle": "",
                "position": 2,
                "style": "{'textColor':'#87a4b8'}",
                "componentCategory": "BTN",
                "componentType": "SEARCHBTN",
                "dataprovider": "",
                "dataproviderType": "",
                "dpParameters": "",
                "navigation": ""
            }]
        },
        "body": [
            {
                "elementTitle": "Outstanding PO Value",
                "position": 1,
                "style": "",
                "componentCategory": "HEADER",
                "componentType": "HEADERWITHOUTSTANDINGVALUE",
                "dataprovider": "",
                "dataproviderType": "GET",
                "dpParameters": "",
                "navigation": ""
            },
            {
                "elementTitle": "FIND ORDER",
                "position": 2,
                "style": "{'textColor':'','selectionColor':''}",
                "componentCategory": "WIDGETTABBARITEM",
                "componentType": "ORDERSTAB",
                "dataprovider": "",
                "dataproviderType": "GET",
                "dpParameters": "",
                "navigation": ""
            },
            {
                "elementTitle": "ENTER SERVICES",
                "position": 3,
                "style": "{'textColor':'','selectionColor':''}",
                "componentCategory": "WIDGETTABBARITEM",
                "componentType": "ORDERSTAB",
                "dataprovider": "",
                "dataproviderType": "GET",
                "dpParameters": "",
                "navigation": ""
            },
            {
                "elementTitle": "ADD NOTES & MEDIA",
                "position": 4,
                "style": "{'textColor':'','selectionColor':''}",
                "componentCategory": "WIDGETTABBARITEM",
                "componentType": "ORDERSTAB",
                "dataprovider": "",
                "dataproviderType": "GET",
                "dpParameters": "",
                "navigation": ""
            },
            {
                "elementTitle": "REVIEW AND CONFIRM",
                "position": 5,
                "style": "{'textColor':'','selectionColor':''}",
                "componentCategory": "WIDGETTABBARITEM",
                "componentType": "ORDERSTAB",
                "dataprovider": "",
                "dataproviderType": "GET",
                "dpParameters": "",
                "navigation": ""
            }],
        "footer": []
    }


    onGetData(): void {
        this.loading = true
        this._dataSourceService.getDataSources()
            .subscribe(
            data => { this.dataSource = data.d.results },
            error => console.log(error),
            () => this.loading = false
            );
    }

    showSelectedServices(val: string) {
        console.log("selected: " + val);
        this.systemId = val;
        this.loading = true;
        this._connectionProviderService.getConnectionProviders(val)
            .subscribe(
            data => this.connectionProviders = data.d.results,
            error => console.log(error),
            () => {
                this.loading = false;
                this.connectionServiceDD = true
            }
            )
    }

    onSelectService(val: string) {
        console.log("selected: " + val);
        this.cpName = val;
        if (val !== "Select") {
            this.searchAPI = true;
            this.searchAPI2 = true;
        } else {
            this.searchAPI = false;
            this.searchAPI2 = false;
        }

    }

    showListOfAPIs(val: string) {
        console.log(val)
        
        if (val.length >= 2) {
            this.loading = true;
            this.apiVal = val;
            this._apiListService.getApiList(this.apiVal, this.systemId, this.cpName)
                .subscribe(
                data => this.APIList = data.d.results,
                error => console.log(error),
                () => {
                    this.loading = false
                    this.apiListDD = true
                }
                )

        }
    }

    showListOfAPIs2(val: string) {
        console.log(val)
        if (val.length >= 2) {
            this.loading = true;
            this.apiVal = val;
            this._apiListService.getApiList(this.apiVal, this.systemId, this.cpName)
                .subscribe(
                data => this.APIList2 = data.d.results,
                error => console.log(error),
                () => {
                    this.loading = false
                    this.apiListDD2 = true
                }
                )

        }
    }

    showListOfFields(val: string) {
        if (val !== 'Select') {
            this.selectedAPI = val;
            console.log(this.searchAPI);
            this.loading = true;
            this._listOfFieldsService.getListOfFields(this.selectedAPI, this.systemId, this.cpName)
                .subscribe(
                data => this.listOfFields = data.d.results,
                error => console.log(error),
                () => {
                    this.showFields = true
                    this.loading = false;
                    //console.log(this.listOfFields)
                }
                )

        }
    }

    showListOfFields2(val: string) {
        if (val !== 'Select') {
            this.selectedAPI2 = val;
            console.log(this.searchAPI);
            this.loading = true;
            this._listOfFieldsService.getListOfFields(this.selectedAPI2, this.systemId, this.cpName)
                .subscribe(
                data => this.listOfFields2 = data.d.results,
                error => console.log(error),
                () => {
                    this.showFields2 = true
                    this.loading = false;
                    //console.log(this.listOfFields)
                }
            )

        }
    }

    postallObjects($obj1, $obj2, $obj4, $obj5, $obj6) {
        this.loading = true;
        let _token: string = '';
        let _status;
        this._cpdpPostService.getTokenData().subscribe(
            data =>
                _token = data
            ,
            error => console.log(error),
            () => {
                if (_token !== '') {
                    console.log('its not empty');
                    console.log("token before:: " + _token);

                    this._cpdpPostService.doPost1($obj1, _token).subscribe(
                        () => { }
                    )

                    setTimeout(() => {
                        this._cpdpPostService.doPost2($obj2, _token).subscribe(
                            () => { }
                        )
                    }, 4000);

                    setTimeout(() => {
                        this._cpdpPostService.doPost4($obj4, _token).subscribe(
                            () => { }
                        )
                    }, 6000);

                    setTimeout(() => {
                        this._cpdpPostService.doPost5($obj5, _token).subscribe(
                            () => { }
                        )
                    }, 8000);

                    setTimeout(() => {
                        this._cpdpPostService.doPost6($obj6, _token).subscribe(
                            () => {
                                console.log('completed all 6')
                                this.loading = false;
                                this.poSummaryPanel = false;
                                this.success = true;

                                jQuery('.section__click span').click();

                                setTimeout(() => {
                                    this.success = false;
                                }, 11000);
                            }
                        )
                    }, 10000);
                }
            }
        )
    }

    postUIObject($uiObj) {

        console.log('initiating..');

        this.loading = true;
        let _token: string = '';
        let _status;
        this._floorplanUIPostService.getTokenData().subscribe(
            data =>
                _token = data
            ,
            error => console.log(error),
            () => {
                if (_token !== '') {

                    this._floorplanUIPostService.doPost($uiObj, _token).subscribe(
                        () => {
                            console.log('completed')
                            this.loading = false;
                            this.success = true;
                            setTimeout(() => {
                                this.success = false;
                            }, 3000);
                        }
                    )
                }
            }
        )
    }

    closeSourceSelector() {
        this.poSummaryPanel = !this.poSummaryPanel;
    }

    closeHeaderSourceSelector() {
        this.poHeaderPanel = !this.poHeaderPanel;
    }

    showProperties() {
        this.showPropertyPanel = !this.showPropertyPanel;
    }

    gotToNextScreen() {
        this.router.navigateByUrl('app-designer/list/ui/fp3');
    }

    gotToPreviousScreen() {
        this.router.navigateByUrl('app-designer/list/ui/fp1');
    }

    removeFloorplan() {
        let r = confirm("Are you sure ?");
        if (r == true) {
            this.router.navigateByUrl('app-designer/list/ui');
        }
    }

    showSourceSelector() {
        this.poSummaryPanel = !this.poSummaryPanel;
        if (this.dataSource.length === 0) {
            this.onGetData();
        }
    }

    //can be removed
    showHeaderSourceSelector() {
        this.poHeaderPanel = !this.poHeaderPanel;
        if (this.dataSource.length === 0) {
            this.onGetData();
        }
    }

    highlightCorresponding(val) {
        jQuery("#" + val).addClass('floorplan__highlight');
    }

    removeHighlightCorresponding(val) {
        jQuery("#" + val).removeClass('floorplan__highlight');
    }

    togglePanel(id, event: any) {
        jQuery("." + id).slideToggle();

    }

    sendFloorplanUI(form: NgForm) {

        //top menu
        this.floorplan_new.pageTitle = form.value.pageTitle;

        //this.floorplan_new.header.right[0].style = "{'textColor':" + "'" + form.value.headerIconsColor + "'" + "}";
        //this.floorplan_new.header.right[1].style = "{'textColor':" + "'" + form.value.headerIconsColor + "'" + "}";

        //header
        this.floorplan_new.headerColor = form.value.headerColor;

        //POSUMMARY
        this.floorplan_new.body[0].dataprovider = form.value.dataProvider;
        this.floorplan_new.body[0].elementTitle = form.value.headerDataDesc;

        //POHEADER
        this.floorplan_new.body[1].dataprovider = form.value.bodyDataProvider;


        //adding to the fpconfig payload
        this.FPConfigWrapper.FPConfg = JSON.stringify(this.floorplan_new)
        console.log(this.floorplan_new);

        //console.log(JSON.stringify(this.FPConfigWrapper));

        this.postUIObject(JSON.stringify(this.FPConfigWrapper))

    }

    sendFloorplanHeaderData(form: NgForm) {
        console.log('Header data');

        console.log(form.value)

    }
    enableSubmit(){
        this.toggleButton = true;
    }
    sendFloorplanDC(form: NgForm) {

        //this is a hack for the demo purpose
        if(form.value.totalAmmount !== undefined){
            var feild1 = form.value.totalAmmount;
            var parts1 = feild1.split('/', 2);
        }else{
            var parts1 = <any>[];
            parts1[0] = 'Not Selected';
            parts1[1] = 'Not Selected';
        }
        if(form.value.currencyType !== undefined){
            var feild2 = form.value.currencyType;
            var parts2 = feild2.split('/', 2);
        }else{
            var parts2 = <any>[];
            parts2[0] = 'Not Selected';
            parts2[1] = 'Not Selected';
        }
        if(form.value.headerDesc !== undefined){
            var feild3 = form.value.headerDesc;
            var parts3 = feild3.split('/', 2);
        }else{
            var parts3 = <any>[];
            parts3[0] = 'Not Selected';
            parts3[1] = 'Not Selected';
        }
        if(form.value.headerPurchasingDoc !== undefined){
            var feild4 = form.value.headerPurchasingDoc;
            var parts4 = feild4.split('/', 2);
        }else{
            var parts4 = <any>[];
            parts4[0] = 'Not Selected';
            parts4[1] = 'Not Selected';
        }
        if(form.value.headerPurchasingOrg !== undefined){
            var feild5 = form.value.headerPurchasingOrg;
            var parts5 = feild5.split('/', 2);
        }else{
            var parts5 = <any>[];
            parts5[0] = 'Not Selected';
            parts5[1] = 'Not Selected';
        }
        if(form.value.headerVendor !== undefined){
            var feild6 = form.value.headerVendor;
            var parts6 = feild6.split('/', 2);
        }else{
            var parts6 = <any>[];
            parts6[0] = 'Not Selected';
            parts6[1] = 'Not Selected';
        }

        console.log(parts1)
        this.cpdpTotalAmmout.DataSource = form.value.dataSources;
        this.cpdpTotalAmmout.ConnectionProvider = form.value.connectionService;
        this.cpdpTotalAmmout.ParameterName = parts1[1];
        this.cpdpTotalAmmout.APIName = form.value.listofSearchedApis;
        this.cpdpTotalAmmout.FieldName = parts1[0];

        this.cpdpTotalAmmout.DataProvider = form.value.dataProviderVal;

        this.cpdpCurrencyType.DataSource = form.value.dataSources;
        this.cpdpCurrencyType.ConnectionProvider = form.value.connectionService;
        this.cpdpCurrencyType.ParameterName = parts2[1];
        this.cpdpCurrencyType.APIName = form.value.listofSearchedApis;
        this.cpdpCurrencyType.FieldName = parts2[0];

        this.cpdpCurrencyType.DataProvider = form.value.dataProviderVal;

        // this.cpdpHeaderDesc.DataSource = form.value.dataSources;
        // this.cpdpHeaderDesc.ConnectionProvider = form.value.connectionService;
        // this.cpdpHeaderDesc.ParameterName = parts3[1];
        // this.cpdpHeaderDesc.APIName = form.value.listofSearchedApis;
        // this.cpdpHeaderDesc.FieldName = parts3[0];

        // this.cpdpHeaderDesc.DataProvider = form.value.dataProviderVal;

        this.cpdpPurchasingDoc.DataSource = form.value.dataSources;
        this.cpdpPurchasingDoc.ConnectionProvider = form.value.connectionService;
        this.cpdpPurchasingDoc.ParameterName = parts4[1];
        this.cpdpPurchasingDoc.APIName = form.value.listofSearchedApis2;
        this.cpdpPurchasingDoc.FieldName = parts4[0];

        this.cpdpPurchasingDoc.DataProvider = form.value.headerDataProviderVal;

        this.cpdpPurchasingOrg.DataSource = form.value.dataSources;
        this.cpdpPurchasingOrg.ConnectionProvider = form.value.connectionService;
        this.cpdpPurchasingOrg.ParameterName = parts5[1];
        this.cpdpPurchasingOrg.APIName = form.value.listofSearchedApis2;
        this.cpdpPurchasingOrg.FieldName = parts5[0];

        this.cpdpPurchasingOrg.DataProvider = form.value.headerDataProviderVal;

        this.cpdpPurchasingVendor.DataSource = form.value.dataSources;
        this.cpdpPurchasingVendor.ConnectionProvider = form.value.connectionService;
        this.cpdpPurchasingVendor.ParameterName = parts6[1];
        this.cpdpPurchasingVendor.APIName = form.value.listofSearchedApis2;
        this.cpdpPurchasingVendor.FieldName = parts6[0];

        this.cpdpPurchasingVendor.DataProvider = form.value.headerDataProviderVal;

        console.log(form.value.vendorVal)

        console.log("field 1 object...");
        console.log(this.cpdpTotalAmmout)
        console.log("field 2 object...");
        console.log(this.cpdpCurrencyType)
        // console.log("field 3 object...");
        // console.log(this.cpdpHeaderDesc)

        
        //create function todo
        let cpdpPurchasingDocDPConfig: Array<any> = JSON.parse(this.cpdpPurchasingDoc.DPConfig);
        cpdpPurchasingDocDPConfig[0].label = form.value.purchasingDocVal;
        cpdpPurchasingDocDPConfig[0].uifieldtype = form.value.headerPurchasingDocType
        this.cpdpPurchasingDoc.DPConfig = JSON.stringify(cpdpPurchasingDocDPConfig[0]);

        //create function todo        
        let cpdpPurchasingOrgDPConfig = JSON.parse(this.cpdpPurchasingOrg.DPConfig);
        cpdpPurchasingOrgDPConfig[0].label = form.value.purchasingOrgVal;
        cpdpPurchasingOrgDPConfig[0].uifieldtype = form.value.headerPurchasingOrgType
        this.cpdpPurchasingOrg.DPConfig = JSON.stringify(cpdpPurchasingOrgDPConfig[0]);

        //create function todo
        let cpdpPurchasingVendorDPConfig = JSON.parse(this.cpdpPurchasingVendor.DPConfig);
        cpdpPurchasingVendorDPConfig[0].label = form.value.vendorVal;
        cpdpPurchasingVendorDPConfig[0].uifieldtype = form.value.headerVendorType
        this.cpdpPurchasingVendor.DPConfig = JSON.stringify(cpdpPurchasingVendorDPConfig[0]);

        console.log("field 4 object...");
        console.log(this.cpdpPurchasingDoc)
        console.log("field 5 object...");
        console.log(this.cpdpPurchasingOrg)
        console.log("field 6 object...");
        console.log(this.cpdpPurchasingVendor)


        //Calls
        this.postallObjects(
            this.cpdpTotalAmmout,
            this.cpdpCurrencyType,
            this.cpdpPurchasingDoc,
            this.cpdpPurchasingOrg,
            this.cpdpPurchasingVendor
        )
    }
}