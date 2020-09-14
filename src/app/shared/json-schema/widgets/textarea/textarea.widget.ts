import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AutoSizeType } from 'ng-zorro-antd/input';
import { DMTextareaWidgetSchema } from './schema';
import { ControlUIWidget } from '@delon/form';

@Component({
  selector: 'dm-textarea',
  templateUrl: './textarea.widget.html',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
})
export class DMTextareaWidget extends ControlUIWidget<DMTextareaWidgetSchema> implements OnInit {
  autosize: boolean | AutoSizeType = true;

  ngOnInit(): void {
    const { autosize } = this.ui;
    if (autosize != null) {
      this.autosize = autosize;
    }
  }
}
