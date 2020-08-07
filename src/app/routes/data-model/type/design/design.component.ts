import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-data-model-design',
  templateUrl: './design.component.html',
})
export class DataModelTypeDesignComponent implements OnInit {
  type: any = {};
  i: any;

  constructor(
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.type.id = this.route.snapshot.paramMap.get('id');
  }

  save(value: any) {
  }

  close() {
  }
}
