import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkbenchPageComponent } from './page/page.component';
import { WorkbenchIndexComponent } from './index/index.component';

const routes: Routes = [

  { path: 'page', component: WorkbenchPageComponent },
  { path: 'index', component: WorkbenchIndexComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkbenchRoutingModule { }
