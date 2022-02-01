import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostService } from 'src/app/services/post.service';
import {Post} from '../../models/post.model';

@Component({
  selector: 'app-postcreate',
  templateUrl: './postcreate.component.html',
  styleUrls: ['./postcreate.component.css']
})
export class PostcreateComponent implements OnInit {
  private mode= 'create';
  post: any
  private postId: any;
  constructor(public postService: PostService,public route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('postId')){
        this.mode='edit';
        this.postId = paramMap.get('postId');
        //this.post = this.postService.getPost(this.postId);
        this.postService.getPost(this.postId).subscribe(postData=>
        {
          this.post = {id: postData._id, title:postData.title, content:postData.content, creator:postData.creator}
        });

      }else{
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
  onAddPost(form: NgForm){
    if(form.invalid){
      return;
    }
    if(this.mode==="create"){
      this.postService.addPost(form.value.title, form.value.content );
    }else{
      this.postService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
  }
}
