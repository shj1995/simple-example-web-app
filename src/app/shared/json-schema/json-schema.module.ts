import { NgModule } from '@angular/core';
import { DelonFormModule, WidgetRegistry } from '@delon/form';
import { SharedModule } from '../shared.module';
import { DMTextWidget } from './widgets/text-display/text.widget';
import { DMTextareaWidget } from './widgets/textarea/textarea.widget';
import { DMImageWidget } from './widgets/image/image.widget';
import { DMEntitySelectWidget } from './widgets/entity-select/entity-select.widget';

// import { TinymceWidget } from './widgets/tinymce/tinymce.widget';
// import { UEditorWidget } from './widgets/ueditor/ueditor.widget';

export const SCHEMA_THIRDS_COMPONENTS = [
  DMTextWidget,
  DMTextareaWidget,
  DMImageWidget,
  DMEntitySelectWidget
];

@NgModule({
  declarations: SCHEMA_THIRDS_COMPONENTS,
  imports: [
    SharedModule,
    DelonFormModule.forRoot(),
  ],
  exports: [
    ...SCHEMA_THIRDS_COMPONENTS,
  ],
})
export class JsonSchemaModule {
  constructor(widgetRegistry: WidgetRegistry) {
    widgetRegistry.register(DMImageWidget.KEY, DMImageWidget);
    widgetRegistry.register(DMEntitySelectWidget.KEY, DMEntitySelectWidget);
    // widgetRegistry.register(UEditorWidget.KEY, UEditorWidget);
  }
}
