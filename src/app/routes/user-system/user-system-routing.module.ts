import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSystemRoleComponent } from './role/role.component';
import { UserSystemUserComponent } from './user/user.component';

const routes: Routes = [

  { path: 'role', component: UserSystemRoleComponent },
  { path: 'user', component: UserSystemUserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserSystemRoutingModule { }
