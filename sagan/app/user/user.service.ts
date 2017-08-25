import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from '../shared/models/user';

@Injectable()
export class UserService {
    private _url: string = "http://localhost:8080/users";
    constructor(private _http: Http) { }

    getUsers(): Observable<User[]> {
        //return an observable
        return this._http
            .get(this._url)
            .map(res => res.json())
    }

    getUser(id: number): Observable<User> {
        //return an observable
        return this._http
            .get(this._url + "/" + id)
            .map(res => res.json())
    }

    createUser(user: User) {
        /*return this._http
            .post(this._url, JSON.stringify(user))
            .map(res => res.json());*/
            return Observable.create({userId: 101});
            //.map(res : any => res.json());
    }

}