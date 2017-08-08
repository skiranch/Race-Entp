import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
        <div class="loading">
            <svg width="100" height="50" viewBox="0 0 831 308"><polygon points="415,0 291,19 415,41 534,10" fill="rgb(9,58,128)" fill-opacity="0.1"><animate attributeName="fill-opacity" begin="0.625s" dur="1s" values="1; 0.1" calcMode="Discrete" keyTimes="0; 1" repeatCount="indefinite"></animate></polygon><polygon points="146,63 272,33 397,54 272,93" fill="rgb(9,58,128)" fill-opacity="0.1"><animate attributeName="fill-opacity" begin="0.5s" dur="1s" values="1; 0.1" calcMode="Discrete" keyTimes="0; 1" repeatCount="indefinite"></animate></polygon><polygon points="430,53 556,21 683,42 559,82" fill="rgb(9,58,128)" fill-opacity="0.1"><animate attributeName="fill-opacity" begin="0.75s" dur="1s" values="1; 0.1" calcMode="Discrete" keyTimes="0; 1" repeatCount="indefinite"></animate></polygon><polygon points="1,115 129,74 259,107 131,159" fill="rgb(12,71,157)" fill-opacity="0.1"><animate attributeName="fill-opacity" begin="0.375s" dur="1s" values="1; 0.1" calcMode="Discrete" keyTimes="0; 1" repeatCount="indefinite"></animate></polygon><polygon points="285,106 414,65 545,96 417,149" fill="rgb(12,71,157)"></polygon><polygon points="573,96 701,56 829,84 705,137" fill="rgb(12,71,157)" fill-opacity="0.1"><animate attributeName="fill-opacity" begin="0.875s" dur="1s" values="1; 0.1" calcMode="Discrete" keyTimes="0; 1" repeatCount="indefinite"></animate></polygon><polygon points="144,172 274,119 407,163 279,228" fill="rgb(75,136,190)" fill-opacity="0.1"><animate attributeName="fill-opacity" begin="0.25s" dur="1s" values="1; 0.1" calcMode="Discrete" keyTimes="0; 1" repeatCount="indefinite"></animate></polygon><polygon points="429,160 560,107 690,150 562,217" fill="rgb(75,136,190)" fill-opacity="0.1"><animate attributeName="fill-opacity" begin="1s" dur="1s" values="1; 0.1" calcMode="Discrete" keyTimes="0; 1" repeatCount="indefinite"></animate></polygon><polygon points="290,241 418,173 551,229 422,308" fill="rgb(136,187,217)" fill-opacity="0.1"><animate attributeName="fill-opacity" begin="0.125s" dur="1s" values="1; 0.1" calcMode="Discrete" keyTimes="0; 1" repeatCount="indefinite"></animate></polygon>Sorry, your browser does not support inline SVG.</svg>
        </div>
  `,
  styles: [`
    .loading{
        background: #fff;
        opacity: 0.8;
        width: 100%;
        height: 100vh;
        position: absolute;
        padding: 50% 0 0 40%;
        z-index: 12;
        top: 0;
        left: 0;
    }
  `]
})
export class LoadingComponent {}
