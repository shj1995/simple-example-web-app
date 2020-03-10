import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STRes, STData } from '@delon/abc/table';
import { SFSchema } from '@delon/form';
import { ZorroTableTreeUtil } from "great-zorroutils";
import { ToolkitMenuMenuEditComponent } from '../menu-edit/menu-edit.component';
import { ToolkitMenuMenuAddComponent } from '../menu-add/menu-add.component';

@Component({
  selector: 'app-toolkit-menu-menu-list',
  templateUrl: './menu-list.component.html',
})
export class ToolkitMenuMenuListComponent implements OnInit {
  data = [{
    id: '1',
    name: 'John 01.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        id: '11',
        name: 'John 01-01',
        age: 42,
        hasChildren: true,
        address: 'New York No. 2 Lake Park'
      },
      {
        id: '12',
        name: 'John 01-02',
        age: 30,
        address: 'New York No. 3 Lake Park'
      }
    ]
  },
  {
    id: '2',
    name: 'Joe 02',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  }
  ];

  treeUtils: ZorroTableTreeUtil<any>

  constructor(
    public http: _HttpClient,
    private modal: ModalHelper) {
  }

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    const that = this;
    this.http.get("/tk/menus").subscribe(res => {

      console.log(res);
      this.treeUtils = new ZorroTableTreeUtil({
        data: res
      });
      that.treeUtils.init();
    });
  }
  add() {
    this.modal
      .createStatic(ToolkitMenuMenuAddComponent, {}, { size: "md" })
      .subscribe((result) => {
        console.log(result);
        this.loadData();

      });
  }
  addChildren(id: string) {
    this.modal
      .createStatic(ToolkitMenuMenuAddComponent, { parentId: id }, { size: "md" })
      .subscribe((result) => {
        console.log(result);
        this.loadData();
      });
  }
  edit(id: string) {
    this.modal
      .createStatic(ToolkitMenuMenuEditComponent, { record: { id } }, { size: "md" })
      .subscribe((result) => {
        console.log(result);
        this.loadData();
      });
  }
  delete(item: any) {
    if (item) {
      this.http.delete(`/tk/menus/${item.id}`).subscribe(() => {
        this.treeUtils.toRemoveNode(item);
      });
    }
  }

  toAddNode() {
    const newNodes = [{
      key: Math.random(),
      name: 'John Brown' + Math.random(),
      age: Math.random(),
      parentKey: "11",
      address: 'New York No. 2 Lake Park',
    }] as Array<any>;
    this.treeUtils.toAddNode(newNodes);
  }

  toUpdateNode() {
    const newNode = {
      key: 11,
      name: 'John Brown' + Math.random(),
      age: Math.random(),
      address: 'New York No. 2 Lake Park',
    };
    this.treeUtils.toUpdateNode(newNode);
  }

  toRemoveNode(item?: any) {
    if (item) {
      this.treeUtils.toRemoveNode(item);
    }
  }

  loadChildren(data: any) {
    const newNodes = [{
      key: Math.random(),
      name: 'John Brown' + Math.random(),
      age: Math.random(),
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

}
