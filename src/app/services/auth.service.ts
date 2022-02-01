import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthData } from '../models/user.model';
import { Subject } from "rxjs";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token:string="";
  private userId: string="";
  private email: string="";
  private isAuthenticated = false;

  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;


  constructor(private http: HttpClient, private router: Router) { }

  getToken(){  return this.token;  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId(){
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  getEmail(){
    /*this.http.get<{email:string}>("http://localhost:3000/api/user/"+this.userId).subscribe(responseData=>{
      this.email= responseData.email
    });*/
    return this.email
  }

  CreateUser(email: string, password: string){
    const authData: AuthData = {email: email, password: password}
    this.http.post<{ token: string, expiresIn: number }>("http://localhost:3000/api/user/signup", authData)
    .subscribe(response =>{
      const token=response.token;
      this.token=token;
      alert(token);
  })
  }

  login(email: string, password: string){
    const authData: AuthData= {email: email, password: password};
    this.http.post<{ token: string, expiresIn: number, userId: string , email:string}>("http://localhost:3000/api/user/login",authData)
    .subscribe(response => {
      const token =response.token;
      this.token=token;
      this.userId = response.userId;
      this.email=response.email;
      if(token)
      {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true)
        const now= new Date();
        const expirationDate = new Date(now.getTime()+expiresInDuration*1000);
        this.saveAuthData(token, expirationDate, this.userId);
        this.router.navigate(['/']);
      }
    });
  }
  logout()
  {
    this.token = "";
    this.isAuthenticated = false;
    this.authStatusListener.next(false)
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = "";
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration',expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    //const isInFuture = authInformation.expirationDate > now;
    const expiresInDuration = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresInDuration>0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = String(authInformation.userId);
      this.setAuthTimer(expiresInDuration / 1000);
      this.authStatusListener.next(true);
    }
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");

    if(!token|| !expirationDate){
      return;
    }
    return{
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer=setTimeout(()=>{
      this.logout();
    }, duration*1000);
  }

}
