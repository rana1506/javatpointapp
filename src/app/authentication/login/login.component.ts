import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authservice: AuthService) { }

  ngOnInit(): void {
  }
  onLogin(form: NgForm){
    if(form.invalid){
      return;
    }
    this.authservice.loginUser(form.value.email, form.value.password);
  }

}
