import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataModelModuleComponent } from './module/module.component';
import { DataModelTypeComponent } from './type/type.component';
import { DataModelTypeDesignComponent } from './type/design/design.component';
import { DataModelFieldComponent } from './field/field.component';
import { DataModelViewComponent } from './type/design/view/view.component';
import { DataModelBusinessComponent } from './type/design/business/business.component';
import { DataModelActionComponent } from './type/design/action/action.component';
import { DataModelPageComponent } from './page/page.component';
import { DataModelInterfaceComponent } from './interface/interface.component';
import { DataModelPageEditComponent } from './page/edit/edit.component';

const routes: Routes = [
  { path: 'module', component: DataModelModuleComponent },
  // { path: 'type', component: DataModelTypeComponent },
  {
    path: 'type',
    children: [
      { path: '', component: DataModelTypeComponent },
      { path: 'design/:id', data: { title: '模型设计' }, component: DataModelTypeDesignComponent }
    ],
  },
  { path: 'field', component: DataModelFieldComponent },
  { path: 'view', component: DataModelViewComponent },
  { path: 'business', component: DataModelBusinessComponent },
  { path: 'action', component: DataModelActionComponent },
  { path: 'page',
    children: [
      { path: '', component: DataModelPageComponent },
      { path: 'design', data: { title: '页面设计' }, component: DataModelPageEditComponent }
    ] },
  { path: 'interface', component: DataModelInterfaceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataModelRoutingModule {}
