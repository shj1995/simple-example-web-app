import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersystemUserUserListComponent } from './user/user-list/user-list.component';
import { UsersystemRoleComponent } from './role/role.component';

const routes: Routes = [

  { path: 'user-list', component: UsersystemUserUserListComponent },
  { path: 'role', component: UsersystemRoleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersystemRoutingModule { }
