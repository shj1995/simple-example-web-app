import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ToolkitRoutingModule } from './toolkit-routing.module';
import { ToolkitMenuComponent } from './menu/menu.component';
import { ToolkitMenuEditComponent } from './menu/edit/edit.component';
import { ToolkitMenuViewComponent } from './menu/view/view.component';

const COMPONENTS = [
  ToolkitMenuComponent];
const COMPONENTS_NOROUNT = [
  ToolkitMenuEditComponent,
  ToolkitMenuViewComponent];

@NgModule({
  imports: [
    SharedModule,
    ToolkitRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
})
export class ToolkitModule { }
