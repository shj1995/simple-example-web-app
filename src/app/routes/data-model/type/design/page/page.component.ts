import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { DataModelFieldEditComponent } from '../field/edit/edit.component';
import { DataModelPageEditComponent } from './edit/edit.component';

@Component({
  selector: 'app-data-model-page',
  templateUrl: './page.component.html',
})
export class DataModelPageComponent implements OnInit {
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
      ],
    },
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) {}

  ngOnInit() {
    this.url = `/dm/types/${this.typeId}/fields`;
  }

  add() {
    this.modal.createStatic(DataModelPageEditComponent, { i: { typeId: this.typeId } }, { size: 'xl' }).subscribe(() => this.st.reload());
  }

}
