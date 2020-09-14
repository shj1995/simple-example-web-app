import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'dm-col-img',
  template: `
    <img nz-tooltip nzTooltipTitle="Client it" nzIcon="user" [src]="'/api/tk/files/'+img+'/view'" class="img" style="cursor: pointer" />
  `,
  host: {
    '(click)': 'show()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class STImgWidget {
  static readonly KEY = 'dm-img';
  isVisible = false;
  img: string;

  constructor(private modal: NzModalService) {}

  show(): void {
    this.isVisible = true;
    this.modal.create({
      nzContent: `<img src="/api/tk/files/${this.img}/view" class="img-fluid" />`,
      nzFooter: null,
    });
  }
}
