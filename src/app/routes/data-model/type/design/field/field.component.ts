import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { DataModelTypeEditComponent } from '../../edit/edit.component';
import { DataModelFieldEditComponent } from './edit/edit.component';

@Component({
  selector: 'app-data-model-field',
  templateUrl: './field.component.html',
})
export class DataModelFieldComponent implements OnInit {
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
            component: DataModelFieldEditComponent,
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
    this.url = `/dm/types/${this.typeId}/fields`;
  }

  add() {
    this.modal.createStatic(DataModelFieldEditComponent, { i: { typeId: this.typeId } }, { size: 'md' }).subscribe(() => this.st.reload());
  }
}
