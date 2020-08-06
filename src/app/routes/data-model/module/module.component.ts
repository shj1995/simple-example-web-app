import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc/st';
import { DataModelModuleEditComponent } from './edit/edit.component';

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
        { text: '查看', click: (item: any) => `/dm/module/${item.id}` },
        { text: '编辑', type: 'static', component: DataModelModuleEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() { }

  add() {
    this.modal
      .createStatic(DataModelModuleEditComponent, { i: { } },{size:'md'})
      .subscribe(() => this.st.reload());
  }

}
