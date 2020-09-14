import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { UserSystemUserViewComponent } from './view/view.component';
import { NzMessageService } from 'ng-zorro-antd';
import { UserSystemUserEditComponent } from './edit/edit.component';
import { UserSystemResetPasswordComponent } from './reset-password/reset-password.component';

@Component({
  selector: 'app-user-system-user',
  templateUrl: './user.component.html',
})
export class UserSystemUserComponent implements OnInit {
  url = `/us/users/search`;
  searchSchema: SFSchema = {
    properties: {
      username: {
        type: 'string',
        title: '用户名',
        default: '',
      },
    },
  };
  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[] = [
    { title: '用户名', index: 'username' },
    { title: '昵称', index: 'nickname' },
    { title: '电话', index: 'phone' },
    { title: '邮箱', index: 'email' },
    {
      title: '头像', type: 'widget',
      widget: { type: 'dm-img', params: ({ record }) => ({ img: record.avatar}) },
    },
    // {
    //   title: '头像',
    //   render: 'avatar',
    // },
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
            component: UserSystemUserViewComponent,
          },
          click: (_record, modal) => this.message.success(`重新加载页面，回传值：${JSON.stringify(modal)}`),
        },
        {
          text: '编辑',
          icon: 'edit',
          type: 'modal',
          modal: {
            component: UserSystemUserEditComponent,
            size: 'md',
          },
          click: (_record, modal) => {
            this.st.reload();
          },
        },
        {
          text: '重置密码',
          // icon: 'edit',
          type: 'modal',
          modal: {
            component: UserSystemResetPasswordComponent,
            size: 'md',
          },
          click: (_record, modal) => {
            this.st.reload();
          },
        },
      ],
    },
  ];
  searchValue: string;

  changeImg(): void {
    this.st.setRow(
      0,
      { picture: { thumbnail: 'https://ng-alain.com/assets/img/logo-color.svg' } },
      { refreshSchema: true, emitReload: false },
    );
  }

  constructor(private http: _HttpClient, private modal: ModalHelper, private message: NzMessageService) {
  }

  ngOnInit() {
  }

  add() {
    this.modal
      .createStatic(UserSystemUserEditComponent, { i: { id: 0 } }, { size: 'md' })
      .subscribe(() => this.st.reload());
  }

}
