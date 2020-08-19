import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { DataModelFieldEditComponent } from '../field/edit/edit.component';
import { DataModelPageEditComponent } from './edit/edit.component';
import { Router } from '@angular/router';

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
            const _type = {
              id:_record.id,
              name:_record.name
            };
            this.router.navigate([`admin/dm/type/${_record.id}/design/page/edit`, { type: JSON.stringify(_type) }]).then((r) => {
              this.st.reload();
            });
          },
        },
      ],
    },
  ];

  constructor(private http: _HttpClient,
              private modal: ModalHelper,
              private router: Router) {}

  ngOnInit() {
    // this.url = `/admin/dm/types/${this.typeId}/fields`;
  }

  add() {

    this.router.navigate([`admin/dm/page/design`]).then((r) => {
      this.st.reload();
    });
    // this.modal.createStatic(DataModelPageEditComponent, { i: { typeId: this.typeId } }, { size: "" }).subscribe(() => this.st.reload());
  }

}
