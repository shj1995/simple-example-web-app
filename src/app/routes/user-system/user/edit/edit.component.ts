import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFSelectWidgetSchema, SFUISchema } from '@delon/form';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-system-user-edit',
  templateUrl: './edit.component.html',
})
export class UserSystemUserEditComponent implements OnInit {
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
        title: '角色',
        ui: {
          widget: 'select',
          mode: 'multiple',
          compareWith: (v1, v2) => {
            return v1 && v2 && v1.id == v2.id;
          },
          asyncData: () => this.http.get(`/us/roles/all`).pipe(map(
            (value: any) => {
              return value.map(v => {
                return {
                  label: v.name, value: v, key: v,
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
          widget: 'tinymce',
        },
      },
    },
    required: ['username', 'nickname'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
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
      this.http.get(`/us/users/${this.record.id}`).subscribe(res => (this.i = res));
    } else {
      this.i = {};
      this.schema.properties = {
        ...this.schema.properties,
        password: { type: 'string', title: '初始密码', minLength: 6 },
      };
    }
  }

  save(value: any) {
    if (this.record.id) {
      this.http.put(`/us/users`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    } else {
      this.http.post(`/us/users`, value).subscribe(res => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    }
  }

  close() {
    this.modal.destroy();
  }
}