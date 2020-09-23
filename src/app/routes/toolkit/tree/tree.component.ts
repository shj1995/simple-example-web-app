import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ZorroTableTreeUtil } from '@core';
import { ToolkitTreeEditComponent } from './edit/edit.component';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { ToolkitMenuEditComponent } from '../menu/edit/edit.component';
import { TreeNodeInterface } from '../menu/menu.component';

@Component({
  selector: 'app-toolkit-tree',
  templateUrl: './tree.component.html',
})
export class ToolkitTreeComponent implements OnInit {

  data = [
    {
      key: 2,
      name: 'Joe 02',
      num: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];
  treeUtils: ZorroTableTreeUtil<any>;

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

  toAddNode() {
    const newNodes = [{
      key: Math.random(),
      name: 'John Brown' + Math.random(),
      num: Math.random(),
      parentKey: '11',
      address: 'New York No. 2 Lake Park',
    }] as Array<any>;
    this.treeUtils.toAddNode(newNodes);
  }

  toUpdateNode() {
    const newNode = {
      key: 11,
      name: 'John Brown' + Math.random(),
      num: Math.random(),
      address: 'New York No. 2 Lake Park',
    };
    this.treeUtils.toUpdateNode(newNode);
  }

  toRemoveNode(item?: any) {
    if (item) {
      this.treeUtils.toRemoveNode(item);
      if (item.parent) {
        item.parent.children = null;
        item.parent.hasChildren = false;
      }
    }
  }

  loadChildren(data: any) {
    const newNodes = [{
      key: Math.random(),
      name: 'John Brown' + Math.random(),
      num: Math.random(),
      address: 'New York No. 2 Lake Park',
    }];
    if (data && !data.children) {
      this.treeUtils.addNodes(data, newNodes);
    }
  }

  collapse(array: any[], data: any, $event: boolean): void {
    this.treeUtils.collapse(array, data, $event);
    this.loadChildren(data);
  }

  checkboxChange(state, node) {
    this.treeUtils.updateCheckState(state, node);
  }

  getCheckedNodeIdGroupByCheckState() {
    const nodes = this.treeUtils.getCheckedNodeGroupByCheckState();
    const recursionAll = [];
    nodes.recursionAll.forEach(v => {
      recursionAll.push(v.name);
    });
    this.messageService.success('全选且子节点已加载：' + recursionAll.join('、'));

    const unRecursionChecked = [];
    nodes.unRecursionChecked.forEach(v => {
      unRecursionChecked.push(v.name);
    });
    this.messageService.success('全选且子节点未加载：' + unRecursionChecked.join('、'));

    const recursionPart = [];
    nodes.recursionPart.forEach(v => {
      recursionPart.push(v.name);
    });
    this.messageService.success('半选且子节点未加载：' + recursionPart.join('、'));
    const unRecursionIndeterminate = [];
    nodes.unRecursionIndeterminate.forEach(v => {
      unRecursionIndeterminate.push(v.name);
    });
    this.messageService.success('半选且子节点已加载：' + unRecursionIndeterminate.join('、'));
  }

  openCreateForm(parentNode) {
    const styleCfg = { width: '600px', height: '250px', overflow: 'auto' };
    const modal = this.modalService.create({
      nzTitle: '表单信息',
      nzContent: ToolkitTreeEditComponent,
      nzWidth: styleCfg.width,
      nzBodyStyle: styleCfg,
      nzComponentParams: {
        parentNode,
      },
      nzFooter: [
        {
          label: '取消',
          onClick: componentInstance => {
            modal.close(null);
          },
        }, {
          label: '保存',
          type: 'primary',
          onClick: componentInstance => {
            const value = componentInstance.submitForm();
            if (value) {
              this.treeUtils.toAddNode([value]);
              modal.close(value);
            }
          },
        },
      ],
    });
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
