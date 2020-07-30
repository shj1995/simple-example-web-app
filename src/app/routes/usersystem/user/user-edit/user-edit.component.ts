import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-usersystem-user-user-edit',
  templateUrl: './user-edit.component.html',
})
export class UsersystemUserUserEditComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      username: { type: 'string', title: '用户名' },
      nickname: { type: 'string', title: '昵称' },
      phone: { type: 'string', title: '电话' },
      email: { type: 'string', title: '邮箱' },
      locked: { type: 'boolean', title: '锁定' }
    },
    required: ['username', 'nickname'],
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
    this.http.get(`/us/users/${this.record.id}`).subscribe(res => (this.i = res));
  }

  save(value: any) {
    this.http.put(`/us/users`, value).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }

  close() {
    this.modal.destroy();
  }
}
