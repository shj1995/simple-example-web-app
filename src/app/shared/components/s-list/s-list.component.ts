import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STRes } from '@delon/abc';
import { SFSchema } from '@delon/form';

@Component({
  selector: 's-list',
  templateUrl: './s-list.component.html',
  styles: []
})
export class SListComponent implements OnInit {
  res: STRes = {
    reName: { total: 'total', list: 'items' }
  }
  url = `/us/roles`;
  searchSchema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: '角色名称'
      }
    }
  };
  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[] = [
    { title: '角色名', index: 'name' },
    { title: '描述', index: 'description' },
    {
      title: '',
      buttons: [
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() {
  }

  add() {

  }

}
