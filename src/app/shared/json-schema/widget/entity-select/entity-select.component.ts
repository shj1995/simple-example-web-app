import { Component, OnInit } from '@angular/core';
import { ControlWidget } from '@delon/form';

@Component({
  selector: 'entity-select',
  templateUrl: './entity-select.component.html',
  styles: [],
})
export class EntitySelectComponent extends ControlWidget implements OnInit {
  static readonly KEY = 'entitySelect';
  listOfOption: string[] = [];
  listOfSelectedValue = ['a10', 'c12'];

  ngOnInit(): void {
    const children: string[] = [];
    for (let i = 10; i < 36; i++) {
      children.push(`${i.toString(36)}${i}`);
    }
    this.listOfOption = children;
  }

  change(value: string): void {
    if (this.ui.change) this.ui.change(value);
    this.setValue(value);
  }

}
