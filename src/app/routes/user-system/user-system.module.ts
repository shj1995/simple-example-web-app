import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { UserSystemRoutingModule } from './user-system-routing.module';
import { UserSystemRoleComponent } from './role/role.component';
import { UserSystemRoleEditComponent } from './role/edit/edit.component';
import { UserSystemRoleViewComponent } from './role/view/view.component';
import { UserSystemUserComponent } from './user/user.component';
import { UserSystemUserEditComponent } from './user/edit/edit.component';
import { UserSystemUserViewComponent } from './user/view/view.component';
import { UserSystemResetPasswordComponent } from './user/reset-password/reset-password.component';

const COMPONENTS = [
  UserSystemRoleComponent,
  UserSystemUserComponent];
const COMPONENTS_NOROUNT = [
  UserSystemRoleEditComponent,
  UserSystemRoleViewComponent,
  UserSystemUserEditComponent,
  UserSystemUserViewComponent,
  UserSystemResetPasswordComponent];

@NgModule({
  imports: [
    SharedModule,
    UserSystemRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
})
export class UserSystemModule { }
