import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-toolkit-category-edit',
  templateUrl: './edit.component.html',
})
export class ToolkitCategoryEditComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '名称' },
      code: { type: 'string', title: '代码' },
      // description: { type: 'string', title: '图标' },
      system: { type: 'boolean', title: '系统' },
      enable: { type: 'boolean', title: '启用' },
    },
    required: ['text'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 24 },
    },
    $no: {
      widget: 'text',
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
  ) {
  }

  ngOnInit(): void {
    if (this.record.id) {
      this.http.get(`/tk/categories/${this.record.id}`).subscribe(res => (this.i = res));
    }else{
      this.i = this.record;
    }
  }

  save(value: any) {
    value.parentId = this.record.parentId;
    if (this.record.id) {
      this.http.put(`/tk/categories`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(res);
      });
    } else {
      this.http.post(`/tk/categories`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(res);
      });
    }

  }

  close() {
    this.modal.destroy();
  }
}
