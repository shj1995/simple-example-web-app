import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Page, SearchPage, Type } from '@core';

@Component({
  selector: 'app-data-model-page-edit',
  styleUrls: ['edit.component.less'],
  templateUrl: './edit.component.html',
})
export class DataModelPageEditComponent implements OnInit {
  type: Type = new Type();
  page: SearchPage = new SearchPage();

  constructor() {
  }

  ngOnInit(): void {
    // if (this.record.id > 0)
    //   this.http.get(`/api/dm/pages/${this.record.id}`).subscribe(res => (this.i = res));
  }

  save(value: any) {
  }

  todo = [
    '字段1',
    '字段2',
    '字段3',
    '字段4',
    '字段5',
  ];

  done = [
    '字段6',
    '字段7',
    '字段8',
    '字段9',
    '字段10',
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
