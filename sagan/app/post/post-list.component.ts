import { Component, OnInit } from '@angular/core';
import {HTTP_PROVIDERS, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

import {PostService} from './post.service';
import {UserService} from '../user/user.service';

import {Post} from '../shared/models/post';
import {User} from '../shared/models/user';
import {Comment} from '../shared/models/comment';

import {SpinnerComponent} from '../shared/spinner.component';

import * as _ from 'underscore';

@Component({
    templateUrl: 'app/post/post-list.component.html',
    providers: [PostService, UserService, HTTP_PROVIDERS],
    directives: [SpinnerComponent/*, PaginationComponent*/]
})
export class PostListComponent implements OnInit {
    postsLoading: boolean = true;
    commentsLoading: boolean = false;
    postsLoadingComplete = false;
    defaultPageSize = 10;
    pages: number[];
    currentPage = 1;


    users: User[];
    posts: Post[];
    postComments: Comment[];
    selectedPost: Post;

    pageSize = 10;
    pagedPosts: Post[] = [];

    constructor(
        private _postService: PostService,
        private _userService: UserService) { }

    ngOnInit() {
        Observable.forkJoin(
            this._userService.getUsers(),
            this._postService.getPosts()
        ).subscribe(response => {
            this.users = response[0]
            this.posts = response[1]

            setTimeout(() => {
                this.pagedPosts = this.getPostsInPage(this.posts, this.currentPage);

                var numberOfPages = this.getNumberOfPages(this.posts, this.defaultPageSize);
                this.pages = _.range(1, numberOfPages + 1);
                this.postsLoadingComplete = true;
                this.postsLoading = false;
            }, 3000);
        }, err => {

        }, () => {
            this.postsLoading = false;
            console.log('loading complete');
        });
    }

    viewSelectedPost(post: Post) {
        this.postComments = []; //reset the columns list
        this.selectedPost = post;
        if (this.selectedPost) {
            this.commentsLoading = true;
            this._postService.getComments(this.selectedPost.id)
                .subscribe(res => {
                    setTimeout(() => {
                        this.postComments = res;
                        this.postComments.forEach(comment => {
                            comment.imageUrl = "http://lorempixel.com/80/80/people?random=1";
                        });
                        this.commentsLoading = false;
                    }, 1000);
                })
        }
    }

    onPageChanged(page: number) {
        this.pagedPosts = this.getPostsInPage(this.posts, page);
    }

    private getPostsInPage(posts: Post[], page: number) {
        var result:Post[] = [];
        var startingIndex = (page - 1) * this.pageSize;
        var endIndex = Math.min(startingIndex + this.pageSize, posts.length);

        for (var i = startingIndex; i < endIndex; i++)
            result.push(posts[i]);

        return result;
    }

    next() {
        console.log('Go to next');
        if (this.currentPage == this.pages.length)
            return;

        this.currentPage++;
        this.pagedPosts = this.getPostsInPage(this.posts, this.currentPage);
    }

    previous() {
        console.log('Go To Previous');
        if (this.currentPage == 1)
            return;

        this.currentPage--;
        this.pagedPosts = this.getPostsInPage(this.posts, this.currentPage);
    }

    changePage(page: number) {
        console.log('Change Page to: ' + page);
        this.currentPage = page;
        this.pagedPosts = this.getPostsInPage(this.posts, this.currentPage);
    }

    nextDisabled(): boolean {
        return Math.ceil(this.currentPage * this.defaultPageSize) == this.posts.length;
    }

    prevDisabled(): boolean {
        return this.currentPage == 1;
    }

    reloadPosts(filter: any) {
        console.log(filter);
        if (filter && filter.userId && +filter.userId > 0) {
            console.log('accepted filter');
            var displayPosts: Post[] = _.filter(this.posts, (post) => {
                return post.userId == filter.userId;
            });
             this.pagedPosts = this.getPostsInPage(displayPosts, this.currentPage);

                var numberOfPages = this.getNumberOfPages(displayPosts, this.defaultPageSize);
                this.pages = _.range(1, numberOfPages + 1);
                this.postsLoadingComplete = true;
                this.postsLoading = false;
        }
    }

    private getNumberOfPages(arr: any[], itemsPerPage: number): number {
        return Math.ceil(arr.length / itemsPerPage);
    }

}