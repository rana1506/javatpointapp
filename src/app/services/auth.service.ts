import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthData } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  CreateUser(email: string, password: string){
    const authData: AuthData = {email: email, password: password}
    this.http.post("http://localhost:3000/api/user/signup", authData)
    .subscribe(response =>{
      alert(response);
  })
  }

  loginUser(email: string, password: string){
    const authData: AuthData= {email: email, password: password};
    this.http.post("http://localhost:3000/api/user/login",authData)
    .subscribe(response => {
      alert('response.body.token');
    });
  }

}
