import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormUserComponent } from './form-user/form-user.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';


const routes: Routes = [
  {path: 'uf', component: FormUserComponent},
  {path: 'rp', component: RecoverPasswordComponent},
  {path: 'reset_pasword', component: ChangePasswordComponent},
  {path: 'reset_password/:tokenPassword', component: ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
