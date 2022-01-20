import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthData } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string="";
  constructor(private http: HttpClient) { }

  getToken(){  return this.token;  }

  CreateUser(email: string, password: string){
    const authData: AuthData = {email: email, password: password}
    this.http.post<{ token: string, expiresIn: number }>("http://localhost:3000/api/user/signup", authData)
    .subscribe(response =>{
      const token=response.token;
      this.token=token;
      alert(token);
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
