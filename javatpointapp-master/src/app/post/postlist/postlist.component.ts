import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistComponent implements OnInit, OnDestroy  {
  posts: Post[] = [];
  private PostSub: Subscription = new Subscription;
  constructor(public postService: PostService,public route:ActivatedRoute) { }

  ngOnInit(): void {
      this.posts=this.postService.getPosts();

      this.PostSub=this.postService.getPostUpdatedListener().
      subscribe((posts: Post[])=>{
      this.posts = posts;
    });
  }
  onDelete(postId: string){
    this.postService.deletePost(postId);
  }
  ngOnDestroy(){
    this.PostSub.unsubscribe();
  }

}
