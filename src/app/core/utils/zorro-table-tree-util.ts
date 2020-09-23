// @ts-ignore
import { ArrayUtils, DataTypeUtils } from 'great-jsutils';

export class ZorroTableTreeUtil<T> {
    keys: any;
    data: any;
    expandDataCache: any;
    expand: string;
    level: string;
    checked: string;
    indeterminate: string;
  constructor({ keys = {
    idKey: "id",
    pIdKey: "parentId",
    pKey: "parent",
    childKey: "children"
  }, data = {}, expandDataCache = {} } = {}) {
    this.expand = "expand";
    this.level = "level";
    this.checked = "checked";
    this.indeterminate = "indeterminate";
    this.keys = keys;
    this.data = data;
    this.expandDataCache = expandDataCache;
    this.init();
  }
  init() {
    this.data.forEach(item => {
      this.expandDataCache[item[this.keys.idKey]] = this.convertTreeToList(item);
    });
  }
  reload() {
    this.data = [...this.data];
    this.data.forEach(item => {
      this.expandDataCache[item[this.keys.idKey]] = this.convertTreeToList(item);
    });
  }
  /*展开与关闭*/
  collapse(array, data, $event) {
    if ($event === false) {
      if (data && data[this.keys.childKey]) {
        data[this.keys.childKey].forEach(d => {
          //noinspection TypeScriptUnresolvedFunction
          const target = array.find(a => a[this.keys.idKey] === d[this.keys.idKey]);
          if (target) {
            target[this.expand] = false;
          }
          this.collapse(array, target, false);
        });
      }
    }
  }
  /*添加节点*/
  toAddNode(newNodes) {
    if (ArrayUtils.valid(newNodes)) {
      let parentId = newNodes[0][this.keys.pIdKey];
      let parentNode = this.getCacheNode(parentId);
      this.addNodes(parentNode, newNodes);
    }
    else {
      let parentId = newNodes[this.keys.pIdKey];
      let parentNode = this.getCacheNode(parentId);
      this.addNodes(parentNode, [newNodes]);
    }
  }
  /*更新节点*/
  toUpdateNode(newNode) {
    if (!newNode) {
      return;
    }
    let id = newNode[this.keys.idKey];
    let oldNode = this.getCacheNode(id);
    if (oldNode) {
      ArrayUtils.merge([oldNode], newNode, this.keys, (old, newNode) => {
        let result = {};
        result[this.checked] = newNode[this.checked] || false;
        result[this.indeterminate] = newNode[this.indeterminate] || false;
        return result;
      });
      let parent = oldNode[this.keys.pKey];
      if (parent) {
        // 兄弟节点
        let siblings = parent[this.keys.childKey];
        if (siblings) {
          ArrayUtils.merge(siblings, newNode, this.keys, (old, newNode) => {
            let result = {};
            result[this.checked] = newNode[this.checked] || false;
            result[this.indeterminate] = newNode[this.indeterminate] || false;
            return result;
          });
        }
      }
      ArrayUtils.merge(this.data, newNode, this.keys, (old, newNode) => {
        let result = {};
        result[this.checked] = newNode[this.checked] || false;
        result[this.indeterminate] = newNode[this.indeterminate] || false;
        return result;
      });
      return oldNode;
    }
    else {
      throw "updated node not found";
    }
  }
  /*移除节点*/
  toRemoveNode(node) {
    if (!node) {
      return;
    }
    if (this.expandDataCache[node[this.keys.idKey]]) {
      delete this.expandDataCache[node[this.keys.idKey]];
      ArrayUtils.remove(this.data, node, this.keys);
      return;
    }
    if (node[this.keys.childKey] && ArrayUtils.validArray(node[this.keys.childKey])) {
      node[this.keys.childKey].forEach(item => {
        this.toRemoveNode(item);
      });
    }
    let id = node[this.keys.idKey];
    let oldNode = this.getCacheNode(id);
    if (oldNode) {
      let rootKey = this.getRootKey(oldNode);
      ArrayUtils.remove(this.expandDataCache[rootKey], node, this.keys);
      ArrayUtils.remove(this.data, node, this.keys);
      let parentNode = oldNode[this.keys.pKey];
      if (parentNode) {
        ArrayUtils.remove(parentNode[this.keys.childKey], node, this.keys);
      }
    }
  }
  /* 获取父节点 */
  getCacheNode(id) {
    for (let key in this.expandDataCache) {
      let cacheNode = this.expandDataCache[key].find((v, i, a) => {
        if (v[this.keys.idKey] == id) {
          return v;
        }
      });
      if (cacheNode) {
        return cacheNode;
      }
    }
    return null;
  }
  /*批量向父节点中追加节点*/
  addNodes(parentNode, newNodes) {
    for (let i = newNodes.length - 1; i > -1; i--) {
      let newNode = newNodes[i];
      if (parentNode) {
        if (!ArrayUtils.valid(parentNode[this.keys.childKey])) {
          parentNode[this.keys.childKey] = [];
        }
        newNode[this.keys.pIdKey] = parentNode[this.keys.idKey];
        if (!this.expandDataCache[this.keys.idKey]) {
          parentNode[this.keys.childKey].push(newNode);
          ArrayUtils.add(this.data, newNode, this.keys);
          newNode[this.keys.pKey] = parentNode;
          let index = this.expandDataCache[this.getRootKey(parentNode)].findIndex((v, i, a) => {
            if (v[this.keys.idKey] == parentNode[this.keys.idKey]) {
              return i;
            }
            ;
          });
          newNode.level = parentNode[this.level] + 1;
          this.expandDataCache[this.getRootKey(parentNode)].splice(index == -1 ? 1 : index + 1, 0, newNode);
        }
      }
      else {
        this.data = [...this.data, newNode];
        if (!this.expandDataCache[newNode[this.keys.idKey]]) {
          this.expandDataCache[newNode[this.keys.idKey]] = [newNode];
        }
      }
    }
  }
  /* 获取一级节点的key*/
  getRootKey(data) {
    if (data && data[this.keys.pKey]) {
      return this.getRootKey(data[this.keys.pKey]);
    }
    else {
      return data[this.keys.idKey];
    }
  }
  convertTreeToList(root) {
    const stack = [];
    const array = [];
    const hashMap = {};
    stack.push(Object.assign({}, root, { level: 0, expand: root[this.expand] || false }));
    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node[this.keys.childKey]) {
        for (let i = node[this.keys.childKey].length - 1; i >= 0; i--) {
          stack.push(Object.assign({}, node[this.keys.childKey][i], { level: node[this.level] + 1, expand: node[this.keys.childKey][i][this.expand] || false, parent: node }));
        }
      }
    }
    return array;
  }
  visitNode(node, hashMap, array) {
    if (!hashMap[node[this.keys.idKey]]) {
      hashMap[node[this.keys.idKey]] = true;
      array.push(node);
    }
  }
  /*
   * 更新节点复选框架的状态*/
  updateCheckState(state, node) {
    if (this.updateChildCheckState(state, node)) {
      this.updateParentCheckState(node);
    }
  }
  /* 更新子节点状态 */
  updateChildCheckState(state, node) {
    node[this.checked] = state;
    node[this.indeterminate] = false;
    this.toUpdateNode(node);
    let children = node[this.keys.childKey];
    if (children && ArrayUtils.valid(children)) {
      children.forEach(item => {
        this.updateChildCheckState(state, item);
      });
    }
    return true;
  }
  /*
   * 更新父节点状态*/
  updateParentCheckState(node) {
    let parent = node[this.keys.pKey];
    if (parent) {
      // 兄弟节点
      let siblings = parent[this.keys.childKey];
      parent[this.checked] = true;
      parent[this.indeterminate] = false;
      if (DataTypeUtils.isArray(siblings)) {
        siblings.forEach(data => {
          if (DataTypeUtils.isUndefined(data[this.checked]) || data[this.checked] == false) {
            parent[this.checked] = false;
          }
          if (data[this.indeterminate] == true || data[this.checked] == true) {
            parent[this.indeterminate] = true;
          }
        });
      }
      if (parent[this.checked] && parent[this.indeterminate]) {
        parent[this.indeterminate] = false;
      }
      this.toUpdateNode(parent);
      this.updateParentCheckState(parent);
    }
  }
  /**
   * 获取展开、未展开的全选与半选的节点id
   * recursionPart:半选状态且子节点未加载
   * unRecursionIndeterminate:半选状态且子节点已加载
   * unRecursionChecked:全选状态且子节点未加载
   * recursionAll:全选状态且子节点已加载
   */
  getCheckedNodeIdGroupByCheckState() {
    let checkNodes = this.getCheckedOrIndeterminate(this.data);
    let map = { unRecursionIndeterminate: [], unRecursionChecked: [], recursionAll: [], recursionPart: [] };
    checkNodes.forEach(data => {
      if (data[this.checked]) {
        let childNodes = data[this.keys.childKey];
        if (childNodes && childNodes.length > 0) {
          map.unRecursionChecked.push(data[this.keys.idKey]);
        }
        else {
          map.recursionAll.push(data[this.keys.idKey]);
        }
      }
      if (data[this.indeterminate]) {
        let childNodes = data[this.keys.childKey];
        if (childNodes && childNodes.length > 0) {
          map.unRecursionIndeterminate.push(data[this.keys.idKey]);
        }
        else {
          map.recursionPart.push(data[this.keys.idKey]);
        }
      }
    });
    return map;
  }
  /**
   * 获取展开、未展开的全选与半选的节点
   * recursionPart:半选状态且子节点未加载
   * unRecursionIndeterminate:半选状态且子节点已加载
   * unRecursionChecked:全选状态且子节点未加载
   * recursionAll:全选状态且子节点已加载
   */
  getCheckedNodeGroupByCheckState() {
    let checkNodes = this.getCheckedOrIndeterminate(this.data);
    let map = { unRecursionIndeterminate: [], unRecursionChecked: [], recursionAll: [], recursionPart: [] };
    checkNodes.forEach(data => {
      if (data[this.checked]) {
        let childNodes = data[this.keys.childKey];
        if (childNodes && childNodes.length > 0) {
          map.unRecursionChecked.push(data);
        }
        else {
          map.recursionAll.push(data);
        }
      }
      if (data[this.indeterminate]) {
        let childNodes = data[this.keys.childKey];
        if (childNodes && childNodes.length > 0) {
          map.unRecursionIndeterminate.push(data);
        }
        else {
          map.recursionPart.push(data);
        }
      }
    });
    return map;
  }
  /**
   * 获取全选或半选的节点
   */
  getCheckedOrIndeterminate(items) {
    let checkedNode = [];
    items.forEach(item => {
      if (!!item[this.checked] || !!item[this.indeterminate]) {
        checkedNode.push(item);
      }
      let children = item[this.keys.childKey];
      if (ArrayUtils.valid(children)) {
        let childrenChecked = this.getCheckedOrIndeterminate(children);
        checkedNode.push(...childrenChecked);
      }
    });
    return checkedNode;
  }
}
//
// export class ZorroTableTreeUtil<T> {
//     // keys: any;
//     // data: any;
//     // expandDataCache: any;
//     // expand: string;
//     // level: string;
//     // checked: string;
//     // indeterminate: string;
//     // constructor({ keys, data, expandDataCache }?: {
//     //     keys?: {
//     //         idKey: string;
//     //         pIdKey: string;
//     //         pKey: string;
//     //         childKey: string;
//     //     };
//     //     data?: {};
//     //     expandDataCache?: {};
//     // });
//     // init(): void;
//     // reload(): void;
//     // collapse(array: T[], data: T, $event: boolean): void;
//     // toAddNode(newNodes: Array<T> | any): void;
//     // toUpdateNode(newNode: T): any;
//     // toRemoveNode(node: any): void;
//     // getCacheNode(id: any): any;
//     // addNodes(parentNode: T, newNodes: Array<any>): void;
//     // private getRootKey;
//     // private convertTreeToList;
//     // private visitNode;
//     // updateCheckState(state: any, node: any): void;
//     // private updateChildCheckState;
//     // private updateParentCheckState;
//     // /**
//     //  * 获取展开、未展开的全选与半选的节点id
//     //  * recursionPart:半选状态且子节点未加载
//     //  * unRecursionIndeterminate:半选状态且子节点已加载
//     //  * unRecursionChecked:全选状态且子节点未加载
//     //  * recursionAll:全选状态且子节点已加载
//     //  */
//     // getCheckedNodeIdGroupByCheckState(): {
//     //     unRecursionIndeterminate: any[];
//     //     unRecursionChecked: any[];
//     //     recursionAll: any[];
//     //     recursionPart: any[];
//     // };
//     // /**
//     //  * 获取展开、未展开的全选与半选的节点
//     //  * recursionPart:半选状态且子节点未加载
//     //  * unRecursionIndeterminate:半选状态且子节点已加载
//     //  * unRecursionChecked:全选状态且子节点未加载
//     //  * recursionAll:全选状态且子节点已加载
//     //  */
//     // getCheckedNodeGroupByCheckState(): {
//     //     unRecursionIndeterminate: any[];
//     //     unRecursionChecked: any[];
//     //     recursionAll: any[];
//     //     recursionPart: any[];
//     // };
//     // /**
//     //  * 获取全选或半选的节点
//     //  */
//     // getCheckedOrIndeterminate(items?: Array<any>): any[];
// }
