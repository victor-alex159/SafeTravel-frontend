import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormUserComponent } from './form-user/form-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
  {path: 'register-user', component: RegisterUserComponent},
  {path: 'rp', component: RecoverPasswordComponent},
  {path: 'reset_pasword', component: ChangePasswordComponent},
  {path: 'reset_password/:tokenPassword', component: ChangePasswordComponent},
  {path: 'profile', component: UserProfileComponent},
  {path: 'list-users', component: ListUsersComponent  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
