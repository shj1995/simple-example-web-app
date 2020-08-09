import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataModelModuleComponent } from './module/module.component';
import { DataModelTypeComponent } from './type/type.component';
import { DataModelTypeDesignComponent } from './type/design/design.component';
import { DataModelFieldComponent } from './type/design/field/field.component';

const routes: Routes = [
  { path: 'module', component: DataModelModuleComponent },
  // { path: 'type', component: DataModelTypeComponent },
  {
    path: 'type',
    children: [
      { path: '', component: DataModelTypeComponent },
      { path: 'design/:id', data: { title: '模型设计' }, component: DataModelTypeDesignComponent },
    ],
  },
  ,
  { path: 'field', component: DataModelFieldComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataModelRoutingModule {}
