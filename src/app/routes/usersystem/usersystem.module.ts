import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { UsersystemRoutingModule } from './usersystem-routing.module';
import { UsersystemUserUserListComponent } from './user/user-list/user-list.component';
import { UsersystemUserUserViewComponent } from './user/user-view/user-view.component';
import { UsersystemUserUserEditComponent } from './user/user-edit/user-edit.component';
import { UsersystemUserUserAddComponent } from './user/user-add/user-add.component';
import { UsersystemUserUserRestPasswordComponent } from './user/user-rest-password/user-rest-password.component';

const COMPONENTS = [
  UsersystemUserUserListComponent];
const COMPONENTS_NOROUNT = [
  UsersystemUserUserViewComponent,
  UsersystemUserUserEditComponent,
  UsersystemUserUserAddComponent,
  UsersystemUserUserRestPasswordComponent];

@NgModule({
  imports: [
    SharedModule,
    UsersystemRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class UsersystemModule { }
