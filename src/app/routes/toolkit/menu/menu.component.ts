import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { ToolkitMenuEditComponent } from './edit/edit.component';
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
  data: TreeNodeInterface[] = [
    {
      id: `1`,
      text: 'John Brown sr.',
      age: 60,
      address: 'New York No. 1 Lake Park',
      children: [
        {
          id: `1-1`,
          text: 'John Brown',
          age: 42,
          address: 'New York No. 2 Lake Park'
        },
        {
          id: `1-2`,
          text: 'John Brown jr.',
          age: 30,
          address: 'New York No. 3 Lake Park',
          children: [
            {
              id: `1-2-1`,
              text: 'Jimmy Brown',
              age: 16,
              address: 'New York No. 3 Lake Park'
            }
          ]
        },
        {
          id: `1-3`,
          text: 'Jim Green sr.',
          age: 72,
          address: 'London No. 1 Lake Park',
          children: [
            {
              id: `1-3-1`,
              text: 'Jim Green',
              age: 42,
              address: 'London No. 2 Lake Park',
              children: [
                {
                  id: `1-3-1-1`,
                  text: 'Jim Green jr.',
                  age: 25,
                  address: 'London No. 3 Lake Park'
                },
                {
                  id: `1-3-1-2`,
                  text: 'Jimmy Green sr.',
                  age: 18,
                  address: 'London No. 4 Lake Park'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: `2`,
      text: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
  constructor(
    public http: _HttpClient,
    private modal: ModalHelper) {
  }
  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.http.get("/tk/menus/all").subscribe(res => {
      this.data = res;
      this.data.forEach(item => {
        this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
      });
    });
  }
  convertTreeToList(root: TreeNodeInterface): TreeNodeInterface[] {
    const stack: TreeNodeInterface[] = [];
    const array: TreeNodeInterface[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level! + 1, expand: false, parent: node });
        }
      }
    }
    return array;
  }
  visitNode(node: TreeNodeInterface, hashMap: { [id: string]: boolean }, array: TreeNodeInterface[]): void {
    if (!hashMap[node.id]) {
      hashMap[node.id] = true;
      array.push(node);
    }
  }
  mapOfExpandedData: { [id: string]: TreeNodeInterface[] } = {};
  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    if (!$event) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.id === d.id)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }
  addChildren(id: string) {
    this.modal
      .createStatic(ToolkitMenuEditComponent, { parentId: id }, { size: "md" })
      .subscribe((result) => {
        console.log(result);
        this.mapOfExpandedData[id].push(result);
      });
  }

}
