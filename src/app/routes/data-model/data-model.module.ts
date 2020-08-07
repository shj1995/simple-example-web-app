import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DataModelRoutingModule } from './data-model-routing.module';
import { DataModelModuleComponent } from './module/module.component';
import { DataModelModuleEditComponent } from './module/edit/edit.component';
import { DataModelModuleViewComponent } from './module/view/view.component';
import { DataModelTypeComponent } from './type/type.component';
import { DataModelTypeEditComponent } from './type/edit/edit.component';
import { DataModelTypeViewComponent } from './type/view/view.component';

const COMPONENTS = [
  DataModelModuleComponent,
  DataModelTypeComponent];
const COMPONENTS_NOROUNT = [
  DataModelModuleEditComponent,
  DataModelModuleViewComponent,
  DataModelTypeEditComponent,
  DataModelTypeViewComponent];

@NgModule({
  imports: [
    SharedModule,
    DataModelRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
})
export class DataModelModule { }
