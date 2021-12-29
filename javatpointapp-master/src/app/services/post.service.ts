import {  HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import{map} from 'rxjs/operators';

import { Post } from '../models/post.model';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  private posts: Post[] = []
  private postUpdated= new Subject<Post[]>();
  /*private posts: Post[] = [
    {id:'', title: 'First Post', content:'This is the first post\'s content'},
    {id:'', title: 'Second Post', content:'This is the second post\'s content'},
    {id:'', title: 'Third Post', content:'This is the third post\'s content'}
  ];*/

  getPosts(){
    this.http.get<{message: string, posts: any }>('http://localhost:3000/api/posts')
    .pipe(map((postData)=>{
      return postData.posts.map((post: { title: any; content: any; _id: any; })=>{
        return{
          title: post.title,
          content:post.content,
          id: post._id
    };
});
    }))
    .subscribe((transformedPost)=>{
      this.posts = transformedPost;
      this.postUpdated.next([...this.posts]);
});
    return this.posts;
  }
  getPostUpdatedListener(){
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string){
    const post: Post={id: "null", title: title, content: content};
    this.http.post<{message: string, postId:string}>('http://localhost:3000/api/posts',post)
    .subscribe(( responseData)=>{
      const id = responseData.postId;
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
    });

  }

  deletePost(postId:string){
    this.http.delete("http://localhost:3000/api/posts/"+postId)
    .subscribe(()=>{
        const updatedPosts = this.posts.filter(post=>post.id!==postId);
        this.posts=updatedPosts;
        this.postUpdated.next([...this.posts]);
    });
  }

  getPost(id: string){
    return {...this.posts.find(p =>p.id ===id)};
  }
  updatePost( id: string, title:string, content:string){
    const post: Post = {id:id, title:title, content:content};
    this.http.put("http://localhost:3000/api/posts/"+id,post)
    .subscribe(()=>{console.log(post.id+" to be updated!")////////////////////
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p=> p.id===post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postUpdated.next([...this.posts]);
      });
  }

}


