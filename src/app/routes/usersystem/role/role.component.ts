import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STRes } from '@delon/abc/table';
import { SFSchema } from '@delon/form';
import { NzMessageService } from 'ng-zorro-antd';
import { UsersystemRoleEditComponent } from './edit/edit.component';
import { UsersystemRoleViewComponent } from './view/view.component';

@Component({
  selector: 'app-usersystem-role',
  templateUrl: './role.component.html',
})
export class UsersystemRoleComponent implements OnInit {
  res: STRes = {
    reName: { total: 'total', list: 'items' }
  }
  url = `/us/roles`;
  searchSchema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: '角色名称'
      }
    }
  };
  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[] = [
    { title: '角色名', index: 'name' },
    { title: '描述', index: 'description' },
    {
      title: '',
      buttons: [
        {
          text: '查看',
          icon: 'search',
          type: 'modal',
          modal: {
            size: 'md',
            component: UsersystemRoleViewComponent
          },
          click: (_record, modal) => this.message.success(`重新加载页面，回传值：${JSON.stringify(modal)}`),
        },
        {
          text: '编辑',
          icon: 'edit',
          type: 'modal',
          modal: {
            component: UsersystemRoleEditComponent,
            size: 'md'
          },
          click: (_record, modal) => {
            this.st.reload();
          }
        },
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper, private message: NzMessageService) { }

  ngOnInit() {
  }

  add() {
    this.modal
      .createStatic(UsersystemRoleEditComponent, {}, { size: "md" })
      .subscribe(() => this.st.reload());
  }

}
