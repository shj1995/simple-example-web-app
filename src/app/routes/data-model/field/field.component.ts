import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc/st';
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
    { title: '类型', index: 'fieldType.displayAs' },
    { title: 'schema', index: 'displayAs' },
    { title: '数组', index: 'array', type: 'yn' },
    { title: '系统', index: 'system', type: 'yn' },
    {
      title: '',
      buttons: [
        {
          text: '编辑',
          icon: 'edit',
          type: 'modal',
          modal: {
            modalOptions: {
              nzMaskClosable: false,
            },
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

  constructor(private http: _HttpClient, private modal: ModalHelper) {
  }

  ngOnInit() {
    this.url = `/dm/types/${this.typeId}/fields`;
  }

  add() {
    this.modal.createStatic(DataModelFieldEditComponent, { i: { typeId: this.typeId } }, { size: 'md' }).subscribe(() => this.st.reload());
  }
}
