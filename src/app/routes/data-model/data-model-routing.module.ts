import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataModelModuleComponent } from './module/module.component';
import { DataModelTypeComponent } from './type/type.component';
import { DataModelTypeDesignComponent } from './type/design/design.component';

const routes: Routes = [

  { path: 'module', component: DataModelModuleComponent },
  // { path: 'type', component: DataModelTypeComponent },
  {
    path: 'type', children: [
      { path: '', component: DataModelTypeComponent },
      { path: 'design', data: { title: '模型设计' }, component: DataModelTypeDesignComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class DataModelRoutingModule {
}
