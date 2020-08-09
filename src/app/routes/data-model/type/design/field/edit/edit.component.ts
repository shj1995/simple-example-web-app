import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-data-model-field-edit',
  templateUrl: './edit.component.html',
})
export class DataModelFieldEditComponent implements OnInit {
  record: any = {};
  i: any;

  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '名称' },
      displayAs: { type: 'string', title: '显示' },
      description: { type: 'string', title: '描述', maxLength: 140 },
    },
    required: ['name', 'displayAs'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    name: {
      widget: 'string',
    },
    displayAs: {
      widget: 'string',
    },
    $description: {
      widget: 'textarea',
      grid: { span: 24 },
    },
  };

  constructor(private modal: NzModalRef, private msgSrv: NzMessageService, public http: _HttpClient) {}

  ngOnInit(): void {
    if (this.record.id) {
      this.http.get(`/dm/fields/${this.record.id}`).subscribe((res) => (this.i = res));
    }
  }

  save(value: any) {
    if (this.record.id) {
      this.http.put(`/dm/fields`, value).subscribe((res) => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    } else {
      this.http.post(`/dm/fields`, value).subscribe((res) => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    }
  }

  close() {
    this.modal.destroy();
  }
}
