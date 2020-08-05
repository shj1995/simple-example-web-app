import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { UserSystemRoleViewComponent } from './view/view.component';
import { UserSystemRoleEditComponent } from './edit/edit.component';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-user-system-role',
  templateUrl: './role.component.html',
})
export class UserSystemRoleComponent implements OnInit {
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
            component: UserSystemRoleViewComponent
          },
          click: (_record, modal) => this.message.success(`重新加载页面，回传值：${JSON.stringify(modal)}`),
        },
        {
          text: '编辑',
          icon: 'edit',
          type: 'modal',
          modal: {
            component: UserSystemRoleEditComponent,
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

  ngOnInit() { }

  add() {
    this.modal
      .createStatic(UserSystemRoleEditComponent, {}, { size: "md" })
      .subscribe(() => this.st.reload());
  }

}
