import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { _HttpClient } from '@delon/theme';
import { SelectWidget, SFSchema, SFSelectWidgetSchema, SFUISchema } from '@delon/form';
import { delay, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { SFSchemaEnumType } from '@delon/form/src/schema';

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
      locked: { type: 'boolean', title: '锁定' },
      roles: {
        type: 'string',
        //type: 'array',
        //items: {
        //  type: 'object',
        //    properties: {
        //      id: { type: 'string' },
        //  }
        //},
        title: '角色',
        default: '请选择角色',
        ui: {
          widget: 'select',
          loadingTip: "loading...",
          config:{},
          mode: 'multiple',
          asyncData: () => this.http.get(`/us/roles/all`).pipe(map(
            (value: any) => {
              return value.map(v => {
                return {
                  label: v.name, value: v, key: v.id,
                };
              });
            },
          )),
        } as SFSelectWidgetSchema,
      },
      remark: {
        type: 'string',
        title: '描述',
        ui: {
          widget: 'tinymce'
        }
      }
    },
    required: ['username', 'nickname'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 24 },
    },
  };

  getRoles() {
    return this.http.get(`/us/roles/${this.record.id}`);
  }

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {
  }


  ngOnInit(): void {
    if (this.record.id) {
      this.http.get(`/us/users/${this.record.id}`).subscribe(res => (this.i = res));
    } else {
      this.i = {};
    }
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
