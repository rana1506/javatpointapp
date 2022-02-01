import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListenerSubs: Subscription=new Subscription;
  public userIsAuthenticated = false;
  public userId: string="";
  public email: string="";

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;
      if(this.userIsAuthenticated)
      {
        this.userId = this.authService.getUserId();
        this.email = this.authService.getEmail();
      }

    });
  }
  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }
  onLogout()
  {
    this.authService.logout();
  }

}
