import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataModelModuleComponent } from './module/module.component';

const routes: Routes = [

  { path: 'module', component: DataModelModuleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataModelRoutingModule { }
