import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-user-system-role-view',
  templateUrl: './view.component.html',
})
export class UserSystemRoleViewComponent implements OnInit {
  record: any = {};
  i: any;

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get(`/us/roles/${this.record.id}`).subscribe(res => this.i = res);
  }

  close() {
    this.modal.destroy();
  }
}
