import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolkitMenuComponent } from './menu/menu.component';
import { ToolkitCategoryComponent } from './category/category.component';
import { ToolkitTreeComponent } from './tree/tree.component';

const routes: Routes = [

  { path: 'menu', component: ToolkitMenuComponent },
  { path: 'category', component: ToolkitCategoryComponent },
  { path: 'tree', component: ToolkitTreeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolkitRoutingModule { }
