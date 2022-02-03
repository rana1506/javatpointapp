import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';

import { ObjectId } from 'mongodb';
const mongoose = require('mongoose');

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistComponent implements OnInit, OnDestroy  {
  posts: Post[] = [];
  userId: string="";
  userIsAuthenticated=false;
  private PostSub: Subscription = new Subscription;
  private authStatusSub: Subscription= new Subscription;
  constructor(public postService: PostService, private authService: AuthService, public route:ActivatedRoute) { }

  ngOnInit(): void {
      this.userId = this.authService.getUserId();
      //this.posts=this.postService.getPosts();
      this.posts=this.postService.getUserPosts(this.userId);
      this.PostSub=this.postService.getPostUpdatedListener().
      subscribe((posts: Post[])=>{
      this.posts = posts;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    });
  }
  onDelete(postId: string){
    this.postService.deletePost(postId);
  }
  ngOnDestroy(){
    this.PostSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
