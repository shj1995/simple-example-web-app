import { Component, OnInit, ViewChild } from '@angular/core';
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

// { title: '名称', index: 'name' },
// { title: '描述', index: 'description' },
// { title: '系统模块', type: 'yn', index: 'system' },
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '名称' },
      description: { type: 'string', title: '描述', maxLength: 15 },
      system: { type: 'boolean', title: '系统模块' },
    },
    required: ['owner', 'callNo', 'href', 'description'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 24 },
    }
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {
    if (this.record.id){
      this.http.get(`/dm/modules/${this.record.id}`).subscribe(res => (this.i = res));
    }
  }

  save(value: any) {
    if (this.record.id){
      this.http.put(`/dm/modules`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    }else{
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
