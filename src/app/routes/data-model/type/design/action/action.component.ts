import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { DataModelFieldEditComponent } from '../../../field/edit/edit.component';
import { DataModelActionEditComponent } from './edit/edit.component';

@Component({
  selector: 'app-data-model-action',
  templateUrl: './action.component.html',
})
export class DataModelActionComponent implements OnInit {
  @Input()
  typeId;
  url = `/dm/types/${this.typeId}/fields`;
  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[] = [
    { title: '名称', index: 'name' },
    { title: '显示', index: 'displayAs' },
    { title: '类型', index: 'type' },
    { title: 'schema', index: 'displayAs' },
    { title: '数组', index: 'array' },
    { title: '系统', index: 'array' },
    {
      title: '',
      buttons: [
        {
          text: '编辑',
          icon: 'edit',
          type: 'modal',
          modal: {
            component: DataModelActionEditComponent,
            size: 'md',
          },
          click: (_record, modal) => {
            this.st.reload();
          },
        },
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ],
    },
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) {}

  ngOnInit() {
    this.url = `/dm/types/${this.typeId}/actions`;
  }

  add() {
    this.modal.createStatic(DataModelActionEditComponent, { i: { typeId: this.typeId } }, { size: 'md' }).subscribe(() => this.st.reload());
  }
}
