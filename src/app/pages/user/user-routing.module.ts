import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormUserComponent } from './form-user/form-user.component';


const routes: Routes = [
  {path: 'uf', component: FormUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
