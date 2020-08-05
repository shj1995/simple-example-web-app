import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { UsersystemRoutingModule } from './usersystem-routing.module';
import { UsersystemUserUserListComponent } from './user/user-list.component';
import { UsersystemUserUserViewComponent } from './user/user-view/user-view.component';
import { UsersystemUserUserEditComponent } from './user/user-edit/user-edit.component';
import { UsersystemUserUserRestPasswordComponent } from './user/user-rest-password/user-rest-password.component';
import { UsersystemRoleComponent } from './role/role.component';
import { UsersystemRoleEditComponent } from './role/edit/edit.component';
import { UsersystemRoleViewComponent } from './role/view/view.component';

const COMPONENTS = [
  UsersystemUserUserListComponent,
  UsersystemRoleComponent];
const COMPONENTS_NOROUNT = [
  UsersystemUserUserViewComponent,
  UsersystemUserUserEditComponent,
  UsersystemUserUserRestPasswordComponent,
  UsersystemRoleEditComponent,
  UsersystemRoleViewComponent];

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
