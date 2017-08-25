import { Component, OnInit } from '@angular/core';
import {ControlGroup, Control, Validators, FormBuilder} from '@angular/common';

import {CanDeactivate, Router} from '@angular/router-deprecated';
import { UserService } from './user.service';
import {BasicValidators} from '../shared/validators/basicValidators';
import {User} from '../shared/models/user';

@Component({
    templateUrl: 'app/user/user-add.component.html',
    providers: [UserService]
})
export class UserAddComponent implements OnInit, CanDeactivate {
    form: ControlGroup;
    user = new User();

    constructor(fb: FormBuilder,
        private _router: Router,
        private _userService: UserService) {

        this.form = fb.group({
            name: ['', Validators.required],
            email: ['', BasicValidators.email],
            phone: [],
            address: fb.group({
                street: [],
                suite: [],
                city: [],
                zipcode: []
            })
        })
    }

    ngOnInit() {

    }

    routerCanDeactivate() {
        if (this.form.dirty) {
            return confirm('You have unsaved changes. Are you sure you want to navigate away?');
        }
        return true;
    }

    save() {
        console.log(this.form);
        this._userService.createUser(this.form.value)
            .subscribe(e => {
                console.log(e);
                this._router.navigate(['Users']);
            });
    }

}