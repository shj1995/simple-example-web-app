import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DataModelRoutingModule } from './data-model-routing.module';
import { DataModelModuleComponent } from './module/module.component';
import { DataModelModuleEditComponent } from './module/edit/edit.component';
import { DataModelModuleViewComponent } from './module/view/view.component';
import { DataModelTypeComponent } from './type/type.component';
import { DataModelTypeEditComponent } from './type/edit/edit.component';
import { DataModelTypeViewComponent } from './type/view/view.component';
import { DataModelTypeDesignComponent } from './type/design/design.component';
import { DataModelFieldComponent } from './type/design/field/field.component';
import { DataModelFieldEditComponent } from './type/design/field/edit/edit.component';
import { DataModelFieldViewComponent } from './type/design/field/view/view.component';

const COMPONENTS = [DataModelModuleComponent, DataModelTypeComponent, DataModelTypeDesignComponent, DataModelFieldComponent];
const COMPONENTS_NOROUNT = [
  DataModelModuleEditComponent,
  DataModelModuleViewComponent,
  DataModelTypeEditComponent,
  DataModelTypeViewComponent,
  DataModelFieldEditComponent,
  DataModelFieldViewComponent,
];

@NgModule({
  imports: [SharedModule, DataModelRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
})
export class DataModelModule {}
