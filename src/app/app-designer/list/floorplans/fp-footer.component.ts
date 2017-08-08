import { Component, NgModule } from '@angular/core';
import { AppDesignerJSON }  from '../../globals';
import { FormlyFieldConfig } from 'ng-formly';
import { Router } from '@angular/router';

declare var jQuery: any;

@Component({
    selector: 'app-fp-footer',
    template: `
        <div class="fp2__footer">
            <ul class="fp2__footer-container">
                <li class="fp2__footer-item">
                    <a class="fp2__footer-link fp2__footer-link--active">
                        <span class="icon-inr_search_symbol fp2__icon-inr_search_symbol"></span>
                        Search/Scan
                    </a>
                </li>
                <li class="fp2__footer-item"><a class="fp2__footer-link">
                    <span class="icon-List fp2__icon-List"></span>
                        Orders
                    </a>
                </li>
                <!--<li class="fp2__footer-item"><a class="fp2__footer-link">
                    <span class="glyphicon glyphicon-bell"></span>
                        <br/>
                    Status</a></li>
                <li class="fp2__footer-item"><a class="fp2__footer-link">
                    <span class="glyphicon glyphicon-calendar"></span>
                        <br/>
                    Timelines</a></li>-->
            </ul>
        </div>
    `,
    styles:[`
    .fp2__footer{
        position: absolute;
        bottom: 0;
        width: 100%;
        background: #fff;
        border-top: solid 1px #ccc;
        
    }
    .fp2__footer-container{
        margin: 0;
        padding: 5px 0;
        display: table;
        width: 100%;
    }
    .fp2__footer-item{
        width: 50%;
        text-align: center;
        list-style: none;
        display: table-cell;
    }
     .fp2__footer-link{
        color: #999;
        font-size: 10px;
        line-height: 10px;
    }
    .fp2__footer-link:hover{
        text-decoration: none;
    }
    .fp2__footer-link--active{
        color: #3678af;
    }

    .fp2__icon-inr_search_symbol, .fp2__icon-List{
        font-size: 20px;
        display:block;
    }
  `]

})

export class FPFotterComponent {

}