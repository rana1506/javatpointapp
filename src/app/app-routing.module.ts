import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostlistComponent } from './post/postlist/postlist.component';

import { PostcreateComponent } from './post/postcreate/postcreate.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AuthGuard } from './authentication/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list', component: PostlistComponent, canActivate: [AuthGuard]},
  { path: 'create', component: PostcreateComponent, canActivate: [AuthGuard]},
  { path: 'edit/:postId', component: PostcreateComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
