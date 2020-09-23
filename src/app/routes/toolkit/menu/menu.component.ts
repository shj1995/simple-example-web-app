import { Component, OnInit } from '@angular/core';
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
  data: TreeNodeInterface[] = [];

  constructor(
    public http: _HttpClient,
    private modal: ModalHelper) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.http.get('/tk/menus/all').subscribe(res => {
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
    stack.push({ ...root, level: 0, expand: !!root.expand });

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level! + 1, expand: !!node.children[i].expand, parent: node });
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
          if (target.expand == true) {
            target.expand = false;
            this.collapse(array, target, false);
          }
        });
      } else {
        return;
      }
    } else {
      this.data.forEach(child => this.setExpand(child, data.id, true));
      console.log(this.data);
    }
  }

  setExpand(data: TreeNodeInterface, id: string, expand: boolean) {
    if (data.id === id) {
      if (data.expand != expand) {
        data.expand = expand;
      }
    } else if (data.children) {
      data.children.forEach(child => {
        this.setExpand(child, id, expand);
      });
    }
  }

  removeData(data: TreeNodeInterface[], id: string) {
    if (data) {
      for (let i = 0; i < data.length; i++) {
        let child = data[i];
        if (id === child.id) {
          data.splice(i, 1);
          return;
        } else {
          this.removeData(child.children, id);
        }
      }
    }
  }

  updateData(data: TreeNodeInterface[], id: string, newData: TreeNodeInterface) {
    if (!data) {
      return;
    }
    const targetIndex = data.findIndex(value => value.id === id);
    if (targetIndex >= 0) {
      let target = data[targetIndex];
      newData = { ...newData, children: target.children, expand: target.expand };
      data.splice(targetIndex, 1, newData);
    } else {
      data.forEach(v => this.updateData(v.children, id, newData));
    }
  }

  addChildren(item: TreeNodeInterface) {
    this.modal
      .createStatic(ToolkitMenuEditComponent, { record: { parentId: item.id } }, { size: 'md' })
      .subscribe((result) => {
        if (!item.children) {
          item.children = [];
        }
        item.children.push(result);
        this.data.forEach(i => {
          this.mapOfExpandedData[i.id] = this.convertTreeToList(i);
        });
      });
  }

  getItemRootId(item: TreeNodeInterface): string {
    // if (item.parent)
    return '';
  }

  delete(id: string) {
    this.http.delete(`/tk/menus/${id}`).subscribe(res => {
      this.removeData(this.data, id);
      this.data.forEach(i => {
        this.mapOfExpandedData[i.id] = this.convertTreeToList(i);
      });
    });
  }

  edit(item: TreeNodeInterface) {
    this.modal
      .createStatic(ToolkitMenuEditComponent, { record: item }, { size: 'md' })
      .subscribe((result) => {
        this.updateData(this.data, item.id, result);
        this.data.forEach(i => {
          this.mapOfExpandedData[i.id] = this.convertTreeToList(i);
        });
      });
  }

  add() {
    this.modal
      .createStatic(ToolkitMenuEditComponent, { record: { parentId: "" } }, { size: 'md' })
      .subscribe((result) => {
        this.data.push(result);
        this.data.forEach(i => {
          this.mapOfExpandedData[i.id] = this.convertTreeToList(i);
        });
      });
  }

}
