import { Component, OnInit } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { ToolkitMenuEditComponent } from './edit/edit.component';
import { Menu, ZorroTableTreeUtil } from '@core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

export interface TreeNodeInterface {
  id: string;
  // key: string;
  text: string;
  age?: number;
  level?: number;
  expand?: boolean;
  address?: string;
  children?: TreeNodeInterface[];
  parent?: TreeNodeInterface;
}

@Component({
  selector: 'app-toolkit-menu',
  templateUrl: './menu.component.html',
})
export class ToolkitMenuComponent implements OnInit {

  data = [];
  treeUtils: ZorroTableTreeUtil<Menu>;

  constructor(
    private modalService: NzModalService,
    private messageService: NzMessageService,
    private http: _HttpClient,
    private modal: ModalHelper,
  ) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get(`/tk/menus/all`).subscribe(res => {
      this.data = res;
      this.treeUtils = new ZorroTableTreeUtil({
        keys: { idKey: 'id', pIdKey: 'parentId', pKey: 'parent', childKey: 'children' },
        data: this.data,
      });
      this.treeUtils.init();
    });
  }

  collapse(array: any[], data: any, $event: boolean): void {
    this.treeUtils.collapse(array, data, $event);
  }

  checkboxChange(state, node) {
    this.treeUtils.updateCheckState(state, node);
  }
  add(parentId: string) {
    this.modal
      .createStatic(ToolkitMenuEditComponent, { record: { parentId: parentId } }, { size: 'md' })
      .subscribe((result) => {
        result.parentId = parentId;
        this.treeUtils.toAddNode(result);
      });
  }

  edit(item: TreeNodeInterface) {
    this.modal
      .createStatic(ToolkitMenuEditComponent, { record: item }, { size: 'md' })
      .subscribe((result) => {
        this.treeUtils.toUpdateNode(result);
      });
  }


  delete(id: string) {
    this.http.delete(`/tk/menus/${id}`).subscribe(res => {
      this.treeUtils.toRemoveNode({id})
    });
  }

}
