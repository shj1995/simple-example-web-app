import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

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
