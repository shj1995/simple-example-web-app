export class Menu {
  private _id: string;

  get id(): string {
    return this._id;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  private _text: string;

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  private _link: string;

  get link(): string {
    return this._link;
  }

  set link(value: string) {
    this._link = value;
  }

  private _icon: string;

  get icon(): string {
    return this._icon;
  }

  set icon(value: string) {
    this._icon = value;
  }

  private _disable: boolean;

  get disable(): boolean {
    return this._disable;
  }

  set disable(value: boolean) {
    this._disable = value;
  }

  private _group: boolean;

  get group(): boolean {
    return this._group;
  }

  set group(value: boolean) {
    this._group = value;
  }

  private _hide: boolean;

  get hide(): boolean {
    return this._hide;
  }

  set hide(value: boolean) {
    this._hide = value;
  }

  private _description: string;

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  private _parentId: string;

  get parentId(): string {
    return this._parentId;
  }

}
