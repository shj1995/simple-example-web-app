import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { DMEntitySelectWidgetSchema } from '../../../../shared/json-schema/widgets/entity-select/schema';

@Component({
  selector: 'app-data-model-type-edit',
  templateUrl: './edit.component.html',
})
export class DataModelTypeEditComponent implements OnInit {
  record: any = {};
  i: any;

  schema: SFSchema = {
    properties: {
      module: { type: 'string', title: '模块', ui: { widget: 'dm-entity-select',sourceUrl:'/dm/modules/all',display:'`${v.name}`' }},
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
      widget: 'dm-entity-select',
    } as DMEntitySelectWidgetSchema,
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
