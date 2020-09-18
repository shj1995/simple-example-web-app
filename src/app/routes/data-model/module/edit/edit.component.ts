import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-data-model-module-edit',
  templateUrl: './edit.component.html',
})
export class DataModelModuleEditComponent implements OnInit {
  record: any = {};
  i: any;

  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '内部名称' },
      displayAs: { type: 'string', title: '显示名称'},
      description: { type: 'string', title: '描述'},
      system: { type: 'boolean', title: '系统模块' },
    },
    required: ['name'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
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
      this.http.get(`/dm/modules/${this.record.id}`).subscribe(res => (this.i = res));
    }
  }

  save(value: any) {
    if (this.record.id) {
      this.http.put(`/dm/modules`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    } else {
      this.http.post(`/dm/modules`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    }
  }

  close() {
    this.modal.destroy();
  }
}
