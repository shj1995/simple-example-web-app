import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { _HttpClient } from '@delon/theme';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-data-model-design',
  templateUrl: './design.component.html',
})
export class DataModelTypeDesignComponent implements OnInit {
  tabs = [1, 2, 3];

  type: any = {};
  i: any;

  constructor(private msgSrv: NzMessageService, public http: _HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.type.id = this.route.snapshot.paramMap.get('id');
    this.type = JSON.parse(this.route.snapshot.paramMap.get('type'));
  }

  save(value: any) {}

  close() {}
}
