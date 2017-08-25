import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';
import {User} from '../shared/models/user';
import {Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
    templateUrl: 'app/user/user-list.component.html',
    providers: [UserService, ROUTER_DIRECTIVES]
})
export class UserListComponent implements OnInit {

    users: User[];

    constructor(private _userService: UserService,
        private _router: Router) { }

    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
        this._userService.getUsers()
            .subscribe(res => {
                this.users = res;
            },
            null,
            () => {

            })
    }

    addNewUser() {
        console.log('add new user');
        this._router.navigate(['UserAdd']);
    }


}