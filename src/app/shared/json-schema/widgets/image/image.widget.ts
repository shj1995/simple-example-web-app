import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DMImageWidgetSchema } from './schema';
import { ControlUIWidget } from '@delon/form';
import { NzMessageService, NzUploadFile } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'dm-image',
  templateUrl: './image.widget.html',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
})
export class DMImageWidget extends ControlUIWidget<DMImageWidgetSchema> implements OnInit {
  static readonly KEY = 'dm-image';
  loading = false;

  ngOnInit(): void {
    this.ui._required = false;
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) => {
    const msg = this.injector.get<NzMessageService>(NzMessageService);
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  };

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        this.loading = false;
        this.setValue(info.file.response);
        break;
      case 'error':
        this.injector.get<NzMessageService>(NzMessageService).error('Network error');
        this.loading = false;
        break;
    }
  }
}
