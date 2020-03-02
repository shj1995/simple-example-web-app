import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersystemUserUserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [

  { path: 'user-list', component: UsersystemUserUserListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersystemRoutingModule { }
