import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }
  onSignup(form: NgForm){
    if(form.invalid){
      return;
    }
    this.authService.CreateUser(form.value.email, form.value.password);

  }
}
