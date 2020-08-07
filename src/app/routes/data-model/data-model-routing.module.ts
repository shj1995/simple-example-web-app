import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataModelModuleComponent } from './module/module.component';
import { DataModelTypeComponent } from './type/type.component';

const routes: Routes = [

  { path: 'module', component: DataModelModuleComponent },
  { path: 'type', component: DataModelTypeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataModelRoutingModule { }
