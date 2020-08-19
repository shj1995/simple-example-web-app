import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Page, Type } from '@core';

@Component({
  selector: 'app-data-model-page-edit',
  styleUrls: ['edit.component.less'],
  templateUrl: './edit.component.html',
})
export class DataModelPageEditComponent implements OnInit {
  type: Type = new Type();
  page: Page = new Page();

  constructor() {
  }

  ngOnInit(): void {
    // if (this.record.id > 0)
    //   this.http.get(`/api/dm/pages/${this.record.id}`).subscribe(res => (this.i = res));
  }

  save(value: any) {
  }

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep',
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog',
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
