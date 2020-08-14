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
import { DataModelViewComponent } from './type/design/view/view.component';
import { DataModelViewEditComponent } from './type/design/view/edit/edit.component';
import { DataModelViewViewComponent } from './type/design/view/view/view.component';
import { DataModelBusinessComponent } from './type/design/business/business.component';
import { DataModelBusinessEditComponent } from './type/design/business/edit/edit.component';
import { DataModelBusinessViewComponent } from './type/design/business/view/view.component';
import { DataModelActionComponent } from './type/design/action/action.component';
import { DataModelActionEditComponent } from './type/design/action/edit/edit.component';
import { DataModelActionViewComponent } from './type/design/action/view/view.component';
import { DataModelPageComponent } from './type/design/page/page.component';
import { DataModelPageEditComponent } from './type/design/page/edit/edit.component';
import { DataModelPageViewComponent } from './type/design/page/view/view.component';
import { DataModelInterfaceComponent } from './type/design/interface/interface.component';
import { DataModelInterfaceEditComponent } from './type/design/interface/edit/edit.component';
import { DataModelInterfaceViewComponent } from './type/design/interface/view/view.component';

const COMPONENTS = [
  DataModelModuleComponent,
  DataModelTypeComponent,
  DataModelTypeDesignComponent,
  DataModelFieldComponent,
  DataModelViewComponent,
  DataModelBusinessComponent,
  DataModelActionComponent,
  DataModelPageComponent,
  DataModelInterfaceComponent
];
const COMPONENTS_NOROUNT = [
  DataModelModuleEditComponent,
  DataModelModuleViewComponent,
  DataModelTypeEditComponent,
  DataModelTypeViewComponent,
  DataModelFieldEditComponent,
  DataModelFieldViewComponent,
  DataModelViewEditComponent,
  DataModelViewViewComponent,
  DataModelBusinessEditComponent,
  DataModelBusinessViewComponent,
  DataModelActionEditComponent,
  DataModelActionViewComponent,
  DataModelPageEditComponent,
  DataModelPageViewComponent,
  DataModelInterfaceEditComponent,
  DataModelInterfaceViewComponent
];

@NgModule({
  imports: [SharedModule, DataModelRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
})
export class DataModelModule {}
