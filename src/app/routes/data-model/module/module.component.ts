import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc/st';
import { DataModelModuleEditComponent } from './edit/edit.component';
import { UserSystemRoleViewComponent } from '../../user-system/role/view/view.component';
import { UserSystemRoleEditComponent } from '../../user-system/role/edit/edit.component';
import { DataModelModuleViewComponent } from './view/view.component';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-data-model-module',
  templateUrl: './module.component.html',
})
export class DataModelModuleComponent implements OnInit {
  url = `/dm/modules/list`;
  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[] = [
    { title: '名称', index: 'name' },
    { title: '描述', index: 'description' },
    { title: '系统模块', type: 'yn', index: 'system' },
    {
      title: '',
      buttons: [
        {
          text: '查看',
          icon: 'search',
          type: 'modal',
          modal: {
            size: 'md',
            component: DataModelModuleViewComponent
          },
          click: (_record, modal) => this.message.success(`重新加载页面，回传值：${JSON.stringify(modal)}`),
        },
        {
          text: '编辑',
          icon: 'edit',
          type: 'modal',
          modal: {
            component: DataModelModuleEditComponent,
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
      .createStatic(DataModelModuleEditComponent, { i: { } },{size:'md'})
      .subscribe(() => this.st.reload());
  }

}
