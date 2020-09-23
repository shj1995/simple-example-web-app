import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ToolkitRoutingModule } from './toolkit-routing.module';
import { ToolkitMenuComponent } from './menu/menu.component';
import { ToolkitMenuEditComponent } from './menu/edit/edit.component';
import { ToolkitMenuViewComponent } from './menu/view/view.component';
import { ToolkitCategoryComponent } from './category/category.component';
import { ToolkitCategoryEditComponent } from './category/edit/edit.component';
import { ToolkitCategoryViewComponent } from './category/view/view.component';
import { ToolkitTreeComponent } from './tree/tree.component';
import { ToolkitTreeEditComponent } from './tree/edit/edit.component';
import { ToolkitTreeViewComponent } from './tree/view/view.component';

const COMPONENTS = [
  ToolkitMenuComponent,
  ToolkitCategoryComponent,
  ToolkitTreeComponent];
const COMPONENTS_NOROUNT = [
  ToolkitMenuEditComponent,
  ToolkitMenuViewComponent,
  ToolkitCategoryEditComponent,
  ToolkitCategoryViewComponent,
  ToolkitTreeEditComponent,
  ToolkitTreeViewComponent];

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
