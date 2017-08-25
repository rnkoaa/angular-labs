import { Component, OnInit } from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    selector: 'navbar',
    templateUrl: 'app/shared/navbar.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class NavbarComponent {
    constructor(private _router: Router){}
}