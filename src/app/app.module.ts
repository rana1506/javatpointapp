
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {  CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostcreateComponent } from './post/postcreate/postcreate.component';
import { PostlistComponent } from './post/postlist/postlist.component';
import { PostService } from './services/post.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AuthInterceptor } from './authentication/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PostcreateComponent,
    PostlistComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule

  ],
  providers: [{provide: HTTP_INTERCEPTORS,
    useClass:AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
