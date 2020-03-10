import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ToolkitRoutingModule } from './toolkit-routing.module';
import { ToolkitMenuMenuListComponent } from './menu/menu-list/menu-list.component';
import { ToolkitMenuMenuEditComponent } from './menu/menu-edit/menu-edit.component';
import { ToolkitMenuMenuAddComponent } from './menu/menu-add/menu-add.component';

const COMPONENTS = [
  ToolkitMenuMenuListComponent];
const COMPONENTS_NOROUNT = [
  ToolkitMenuMenuEditComponent,
  ToolkitMenuMenuAddComponent];

@NgModule({
  imports: [
    SharedModule,
    ToolkitRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class ToolkitModule { }
