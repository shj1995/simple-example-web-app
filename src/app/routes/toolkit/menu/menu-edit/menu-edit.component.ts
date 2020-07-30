import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema, SFSelectWidgetSchema } from '@delon/form';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-toolkit-menu-menu-edit',
  templateUrl: './menu-edit.component.html',
})
export class ToolkitMenuMenuEditComponent implements OnInit {
  @Input()
  id: string;
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      text: { type: 'string', title: '名称' },
      link: { type: 'string', title: '链接', maxLength: 15 },
      icon: { type: 'number', title: '图标' },
      roles: {
        type: 'string',
        title: '角色',
        default: 'WAIT_BUYER_PAY',
        ui: {
          widget: 'select',
          asyncData: () =>
            of([
              {
                label: '订单状态',
                group: true,
                children: [
                  { label: '待支付', value: 'WAIT_BUYER_PAY' },
                  { label: '已支付', value: 'TRADE_SUCCESS' },
                  { label: '交易完成', value: 'TRADE_FINISHED' },
                ],
              },
            ]).pipe(delay(3000)),
        },
      },
      description: { type: 'string', title: '描述', maxLength: 140 },
    },
    required: ['text'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 24 },
    },
    $no: {
      widget: 'text'
    },
    $href: {
      widget: 'string',
    },
    $description: {
      widget: 'textarea',
      grid: { span: 24 },
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) { }

  ngOnInit(): void {
    this.http.get(`/tk/menus/${this.record.id}`).subscribe(res => (this.i = res));
  }

  save(value: any) {
    this.http.put(`/tk/menus`, value).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }

  close() {
    this.modal.destroy();
  }
}
