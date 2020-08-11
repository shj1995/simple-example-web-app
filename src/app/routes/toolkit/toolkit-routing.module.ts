import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToolkitMenuComponent } from './menu/menu.component';

const routes: Routes = [

  { path: 'menu', component: ToolkitMenuComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolkitRoutingModule { }
