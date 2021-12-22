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
        this.post = this.postService.getPost(this.postId);
       }else{
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
  onAddPost(form: NgForm){
alert(form.value.t)
    if(form.invalid){

      return;
    }
    this.postService.addPost(form.value.title, form.value.content )
  }

}
