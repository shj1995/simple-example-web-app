import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFSelectWidgetSchema, SFUISchema } from '@delon/form';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-data-model-type-edit',
  templateUrl: './edit.component.html',
})
export class DataModelTypeEditComponent implements OnInit {
  record: any = {};
  i: any;

  schema: SFSchema = {
    properties: {
      module: { type: 'string', title: '模块' },
      name: { type: 'string', title: '表名' },
      displayAs: { type: 'string', title: '显示名称' },
      description: { type: 'string', title: '描述', maxLength: 15 },
      system: { type: 'boolean', title: '系统模块' },
      service: { type: 'string', title: '服务类' },
    },
    required: ['module', 'name'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 24 },
    },
    $module: {
      widget: 'select',
      compareWith: (v1, v2) => {
        return v1 && v2 && v1.id == v2.id;
      },
      asyncData: () =>
        this.http.get(`/dm/modules/all`).pipe(
          map((value: any) => {
            return value.map((v) => {
              return {
                label: v.name,
                value: v,
                key: v,
              };
            });
          }),
        ),
    } as SFSelectWidgetSchema,
  };

  constructor(private modal: NzModalRef, private msgSrv: NzMessageService, public http: _HttpClient) {}

  ngOnInit(): void {
    if (this.record.id) {
      this.http.get(`/dm/types/${this.record.id}`).subscribe((res) => (this.i = res));
    }
  }

  save(value: any) {
    if (this.record.id) {
      this.http.put(`/dm/types`, value).subscribe((res) => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    } else {
      this.http.post(`/dm/types`, value).subscribe((res) => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    }
  }

  close() {
    this.modal.destroy();
  }
}
