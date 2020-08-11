import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { WorkbenchRoutingModule } from './workbench-routing.module';
import { WorkbenchPageComponent } from './page/page.component';
import { WorkbenchPageEditComponent } from './page/edit/edit.component';
import { WorkbenchPageViewComponent } from './page/view/view.component';
import { WorkbenchIndexComponent } from './index/index.component';

const COMPONENTS = [
  WorkbenchPageComponent,
  WorkbenchIndexComponent];
const COMPONENTS_NOROUNT = [
  WorkbenchPageEditComponent,
  WorkbenchPageViewComponent];

@NgModule({
  imports: [
    SharedModule,
    WorkbenchRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
})
export class WorkbenchModule { }
