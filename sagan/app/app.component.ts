import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './shared/navbar.component';
import { UserListComponent } from './user/user-list.component';
import { UserAddComponent } from './user/user-add.component';
import { PostListComponent } from './post/post-list.component';

import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    selector: 'sagan-app',
    template: `<navbar></navbar>
    <div class="container"><router-outlet></router-outlet></div>`,
    directives: [NavbarComponent, UserListComponent,
        ROUTER_DIRECTIVES,
        PostListComponent,]
})
@RouteConfig([
    {
        path: "/users",
        name: "Users",
        component: UserListComponent,
        useAsDefault: true
    },
    {
        path: "/users/add",
        name: "UserAdd",
        component: UserAddComponent
        },
    {
        path: "/posts",
        name: "Posts",
        component: PostListComponent
    },
    {
        //catch all routes to redirect to home.
        path: "/*other", name: "other", redirectTo: ["Users"]
    }
])
export class AppComponent implements OnInit {

    constructor() { }

    ngOnInit() {

    }

}