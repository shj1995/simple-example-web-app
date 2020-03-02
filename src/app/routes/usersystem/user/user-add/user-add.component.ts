import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-usersystem-user-user-add',
  templateUrl: './user-add.component.html',
})
export class UsersystemUserUserAddComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      username: { type: 'string', title: '用户名', minLength: 6 },
      uickname: { type: 'string', title: '昵称' },
      password: { type: 'string', title: '初始密码', minLength: 6 },
      phone: { type: 'string', title: '电话' },
      email: { type: 'string', title: '邮箱' }
    },
    required: ['username', 'uickname', 'password'],
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
  ) { }

  ngOnInit(): void {
  }

  save(value: any) {
    this.http.post(`/us/users`, value).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }

  close() {
    this.modal.destroy();
  }
}
