import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DatamodelRoutingModule } from './datamodel-routing.module';
import { DatamodelListenerComponent } from './listener/listener.component';

const COMPONENTS = [
  DatamodelListenerComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    DatamodelRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class DatamodelModule { }
