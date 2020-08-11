import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-workbench-index',
  templateUrl: './index.component.html',
})
export class WorkbenchIndexComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() { }

}
