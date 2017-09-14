import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-fp-nav',
    template: `
    <nav class="floorplan__nav">
        <ul class="floorplan__nav-container">
            <li class="floorplan__nav-item floorplan__nav-item--active"><a class="floorplan__nav-link" href="#">{{tabOneName}}</a><span class="floorplan__nav-step">1</span></li>
            <li class="floorplan__nav-item"><a class="floorplan__nav-link" href="#">{{tabTwoName}}</a><span class="floorplan__nav-step">2</span></li>
            <li class="floorplan__nav-item"><a class="floorplan__nav-link" href="#">{{tabThreeName}}</a><span class="floorplan__nav-step">3</span></li>
            <li class="floorplan__nav-item"><a class="floorplan__nav-link" href="#">{{tabFourName}}</a><span class="floorplan__nav-step">4</span></li>
        </ul>
    </nav>
    `,
    styles:[`
    .floorplan__nav{
        display: block;
        width: 100%;
        height: 46px;
        white-space: nowrap;
        overflow-x: auto;
        
    }
    .floorplan__nav-container{
        padding: 0;
        text-align: left;
        margin: 0;
        display: table;
        width: 120%;
    }
    .floorplan__nav-item{
        list-style: none;
        display: inline-block;
        position: relative;
        border-bottom: solid 1px #ccc;
        background: #fff;
        display: table-cell;
    }
    .floorplan__nav-item--active{
        border-bottom: solid 1px #337ab7;
    }
    .floorplan__nav-item--active .floorplan__nav-link{
        color: #337ab7;
    }
    .floorplan__nav-item--active .floorplan__nav-step{
        color: #337ab7;
        border: solid 1px #337ab7;
    }
    .floorplan__nav-link{
        font-size: 13px;
        padding: 10px 6px;
        display: block;
        color: #999;
        text-align: center;
        font-family: 'SFUIDisplay-Semibold';


        &:hover{
            text-decoration: none;
        }
    }

    .floorplan__nav-link:hover{
        text-decoration: none;
    }
    
    .floorplan__nav-step{
        font-size: 13px;
        background: #fff;
        border-radius: 30px;
        padding: 4px 5px;
        color: #999;
        position: absolute;
        bottom: -21%;
        border: solid 1px #999;
        line-height: 8px;
        transform: translate(-50%, 0);
        left: 50%;
        z-index: 10;
        font-family: 'SFUIDisplay-Semibold';


        &--done{
            padding: 0;
            height: 13px;
            width: 16px;
            vertical-align: middle;
            font-size: 16px;
            border: 0;
        }
        
    }

    .floorplan__nav-step--done{
        padding: 0;
        height: 13px;
        width: 16px;
        vertical-align: middle;
        font-size: 16px;
        border: 0;
    }
        
  `]

})

export class FPNavComponent {
    @Input() tabOneName: string;
    @Input() tabTwoName: string;
    @Input() tabThreeName: string;
    @Input() tabFourName: string;
}