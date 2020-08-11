import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-toolkit-menu-edit',
  templateUrl: './edit.component.html',
})
export class ToolkitMenuEditComponent implements OnInit {
  parentId: string;
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      text: { type: 'string', title: '名称' },
      link: { type: 'string', title: '链接' },
      icon: { type: 'string', title: '图标' },
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
    if(this.record.id){
      this.http.get(`/tk/menus/${this.record.id}`).subscribe(res => (this.i = res));
    }
  }

  save(value: any) {
    if (this.record.id){
      value.parentId = this.parentId;
      this.http.put(`/tk/menus`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    }else{
      value.parentId = this.parentId;
      this.http.post(`/tk/menus`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(value);
      });
    }

  }

  close() {
    this.modal.destroy();
  }
}
