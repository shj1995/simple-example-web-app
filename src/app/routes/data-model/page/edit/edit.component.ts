import { Component, OnInit, ViewChild } from '@angular/core';
import { Column, Field, PageType, SearchPage, Type } from '@core';
import { STColumn, STComponent } from '@delon/abc/st';
import { DataModelFieldEditComponent } from '../../field/edit/edit.component';
import { Router } from '@angular/router';
import { SFRadioWidgetSchema, SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-data-model-page-edit',
  styleUrls: ['edit.component.less'],
  templateUrl: './edit.component.html',
})
export class DataModelPageEditComponent implements OnInit {
  type: Type = new Type();
  page: SearchPage = new SearchPage();

  url = `/dm/types/fields`;
  basicSchema: SFSchema = {
    properties: {
      name: {
        type: 'string', title: '内部名称',
      },
      displayAs: {
        type: 'string', title: '显示名称',
      },
      title: {
        type: 'string', title: '页面标题',
      },
      description: {
        type: 'string', title: '描述',
      },
    },
    required: ['name'],
  };
  basicSchemaUi: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 24 },
    },
  };

  columnsSchema: SFSchema = {
    properties: {
      columns: {
        type: 'array', title: '内部名称',
        items: {
          Field: { type: 'string' },
          b: { type: 'number', ui: { spanLabel: 10 } },
        },
      },
    },
    required: ['name'],
  };

  constructor(
    private router: Router,
  ) {
    let field: Field = new Field();
    field.name = 'name';
    let column: Column = new Column();
    column.displayAs = '姓名';
    column.field = field;

    this.page.columns.push(column);
    this.page.columns.push(column);
    this.page.columns.push(column);
    this.page.type = PageType.SEARCH;
  }

  ngOnInit(): void {
    setTimeout(() => {
      let stColumns = this.page.columns.map(v => {
        return {
          title: v.displayAs, index: v.field.name,
        } as STColumn;
      });
      this.columns = [
        ...stColumns,
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
                  id: _record.id,
                  name: _record.name,
                };
                this.router.navigate([`admin/dm/type/${_record.id}/design/page/edit`, { type: JSON.stringify(_type) }]).then((r) => {
                  this.st.reload();
                });
              },
            },
          ],
        },
      ];
    }, 3000);
  }

  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[] = [
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
              id: _record.id,
              name: _record.name,
            };
            this.router.navigate([`admin/dm/type/${_record.id}/design/page/edit`, { type: JSON.stringify(_type) }]).then((r) => {
              this.st.reload();
            });
          },
        },
      ],
    },
  ];

  add() {

  }
}
