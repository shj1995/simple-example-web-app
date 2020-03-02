import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatamodelListenerComponent } from './listener/listener.component';

const routes: Routes = [

  { path: 'listener', component: DatamodelListenerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatamodelRoutingModule { }
