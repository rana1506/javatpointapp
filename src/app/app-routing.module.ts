import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostlistComponent } from './post/postlist/postlist.component';

import { PostcreateComponent } from './post/postcreate/postcreate.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';

const routes: Routes = [
  { path: '', component: PostlistComponent },
  { path: 'create', component: PostcreateComponent},
  { path: 'edit/:postId', component: PostcreateComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
