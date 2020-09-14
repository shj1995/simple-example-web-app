import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DMTextWidgetSchema } from './schema';
import { ControlUIWidget } from '@delon/form';

@Component({
  selector: 'dm-text',
  template: `
    <sf-item-wrap [id]="id" [schema]="schema" [ui]="ui" [showError]="showError" [error]="error" [showTitle]="schema.title">
      {{ value || ui.defaultText || '-' }}
    </sf-item-wrap>
`,
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
})
export class DMTextWidget extends ControlUIWidget<DMTextWidgetSchema> implements OnInit {
  ngOnInit(): void {
    this.ui._required = false;
  }
}
