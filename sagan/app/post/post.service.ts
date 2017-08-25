import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Post } from '../shared/models/post';
import { Comment } from '../shared/models/comment';

@Injectable()
export class PostService {
    private _url: string = "http://localhost:8080/posts";

    constructor(private _http: Http) { }

    getPosts(): Observable<Post[]> {
        //return an observable
        return this._http
            .get(this._url)
            .map(res => res.json())
    }

    getPost(id: number): Observable<Post> {
        //return an observable
        return this._http
            .get(this._url + "/" + id)
            .map(res => res.json())
    }
   
    getComments(id: number): Observable<Comment[]> {
        //return an observable
        return this._http
            .get(this._url + "/" + id + "/comments")
            .map(res => res.json())
    }

    createPost(post: Post) {
        return this._http
            .post(this._url, JSON.stringify(post))
            .map(res => res.json());
    }
}