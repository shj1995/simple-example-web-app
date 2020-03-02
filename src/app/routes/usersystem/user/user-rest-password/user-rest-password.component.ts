import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-usersystem-user-user-rest-password',
  templateUrl: './user-rest-password.component.html',
})
export class UsersystemUserUserRestPasswordComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      oldPassword: { type: 'string', title: '原密码' },
      newPassword: { type: 'string', title: '新密码', minLength: 6 },
      confirmPassword: { type: 'string', title: '确认密码', minLength: 6 },
    },
    required: ['oldPassword', 'newPassword', 'confirmPassword'],
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
    // this.i.userId = this.record.id;
    // if (this.record.id > 0)
    // this.http.get(`/us/users/${this.record.id}`).subscribe(res => (this.i = res));
  }

  save(value: any) {
    console.log(value);
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
