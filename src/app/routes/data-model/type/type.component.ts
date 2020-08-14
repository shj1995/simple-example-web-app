import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc/st';
import { DataModelTypeEditComponent } from './edit/edit.component';
import { NzMessageService } from 'ng-zorro-antd';
import { DataModelTypeViewComponent } from './view/view.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-model-type',
  templateUrl: './type.component.html',
})
export class DataModelTypeComponent implements OnInit {
  url = `/dm/types/list`;
  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[] = [
    { title: '模块', index: 'module.name' },
    { title: '表名', index: 'name' },
    { title: '显示名称', index: 'displayAs' },
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
            component: DataModelTypeViewComponent,
          },
          click: (_record, modal) => this.message.success(`重新加载页面，回传值：${JSON.stringify(modal)}`),
        },
        {
          text: '编辑',
          icon: 'edit',
          type: 'modal',
          modal: {
            component: DataModelTypeEditComponent,
            size: 'md',
          },
          click: (_record, modal) => {
            this.st.reload();
          },
        },
        {
          text: '模型设计',
          icon: 'edit',
          type: 'link',

          click: (_record, modal) => {
            const _type = {
              id:_record.id,
              name:_record.name
            };
            this.router.navigate([`admin/dm/type/design/${_record.id}`, { type: JSON.stringify(_type) }]).then((r) => {
              this.st.reload();
            });
          },
        },
      ],
    },
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper, private message: NzMessageService, private router: Router) {}

  ngOnInit() {}

  add() {
    this.modal.createStatic(DataModelTypeEditComponent, { i: {} }, { size: 'md' }).subscribe(() => this.st.reload());
  }
}
