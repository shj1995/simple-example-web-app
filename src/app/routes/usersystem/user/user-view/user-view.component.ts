import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-usersystem-user-user-view',
  templateUrl: './user-view.component.html',
})
export class UsersystemUserUserViewComponent implements OnInit {
  @Input()
  record: any = {};
  data: any;

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get(`/us/users/${this.record.id}`).subscribe(res => this.data = res);
  }

  close() {
    this.modal.destroy();
  }
}
