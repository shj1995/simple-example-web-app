import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-user-system-role-edit',
  templateUrl: './edit.component.html',
})
export class UserSystemRoleEditComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '角色名称' },
      description: { type: 'string', title: '描述', maxLength: 140 },
    },
    required: ['name'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $name: {
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
      this.http.get(`/us/roles/${this.record.id}`).subscribe(res => (this.i = res));
    } else {
      this.i = {};
    }
  }

  save(value: any) {
    if (this.record.id > 0) {
      this.http.put(`/us/roles`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    } else {
      this.http.post(`/us/roles`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    }
  }

  close() {
    this.modal.destroy();
  }
}
