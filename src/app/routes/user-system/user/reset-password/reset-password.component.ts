import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-user-system-reset-password',
  templateUrl: './reset-password.component.html',
})
export class UserSystemResetPasswordComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      oldPassword: { type: 'string', title: '原密码', ui: { type: 'password' } },
      newPassword: { type: 'string', title: '新密码', minLength: 6 , ui: { type: 'password' }},
      confirmPassword: { type: 'string', title: '确认密码', minLength: 6 , ui: { type: 'password' }},
    },
    required: ['oldPassword', 'newPassword', 'confirmPassword'],
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
  }

  save(value: any) {
    value.userId = this.record.id;
    this.http.put(`/us/users/reset_password`, value).subscribe(res => {
      this.msgSrv.success('重置成功');
      this.modal.close(true);
    });
  }

  close() {
    this.modal.destroy();
  }
}
