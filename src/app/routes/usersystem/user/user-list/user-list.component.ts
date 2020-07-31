import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STReqReNameType, STReq, STData, STRes } from '@delon/abc/table';
import { SFSchema } from '@delon/form';
import { UsersystemUserUserViewComponent } from '../user-view/user-view.component';
import { isTemplateRef, NzMessageService } from 'ng-zorro-antd';
import { UsersystemUserUserEditComponent } from '../user-edit/user-edit.component';
import { UsersystemUserUserAddComponent } from '../user-add/user-add.component';
import { UsersystemUserUserRestPasswordComponent } from '../user-rest-password/user-rest-password.component';

@Component({
  selector: 'app-usersystem-user-user-list',
  templateUrl: './user-list.component.html',
})
export class UsersystemUserUserListComponent implements OnInit {
  res: STRes = {
    reName: { total: 'total', list: 'items' }
  }
  url = `/us/users`;
  searchSchema: SFSchema = {
    properties: {
      username: {
        type: 'string',
        title: '用户名',
        default: ''
      },
      locked: {
        type: 'boolean',
        title: '是否锁定',
        default: ''
      }
    }
  };
  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[] = [
    { title: '用户名', index: 'username' },
    { title: '昵称', index: 'nickname' },
    { title: '电话', index: 'phone' },
    { title: '邮箱', index: 'email' },
    { title: '启用', type: 'yn', index: 'enabled' },
    // { title: '过期', type: 'yn', index: 'expired' },
    { title: '锁定', type: 'yn', index: 'locked' },
    {
      title: '',
      buttons: [
        {
          text: '查看',
          icon: 'search',
          type: 'modal',
          modal: {
            size: 'md',
            component: UsersystemUserUserViewComponent
          },
          click: (_record, modal) => this.message.success(`重新加载页面，回传值：${JSON.stringify(modal)}`),
        },
        {
          text: '编辑',
          icon: 'edit',
          type: 'modal',
          modal: {
            component: UsersystemUserUserEditComponent,
            size: 'md'
          },
          click: (_record, modal) => {
            this.st.reload();
          }
        },
        {
          text: '重置密码',
          // icon: 'edit',
          type: 'modal',
          modal: {
            component: UsersystemUserUserRestPasswordComponent,
            size: 'md'
          },
          click: (_record, modal) => {
            this.st.reload();
          },
        },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper, private message: NzMessageService) { }

  ngOnInit() {
    console.log(this.st);
  }

  add() {
    this.modal
      .createStatic(UsersystemUserUserAddComponent, {}, { size: "md" })
      .subscribe(() => this.st.reload());
  }

}
