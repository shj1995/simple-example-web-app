import { Field } from './field';

export class Type {
  private _name: string = '';
  private _displayAs: string = '';
  private _description: string = '';
  private _service: string = '';
  private _fieldList: Array<Field>;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get displayAs(): string {
    return this._displayAs;
  }

  set displayAs(value: string) {
    this._displayAs = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get service(): string {
    return this._service;
  }

  set service(value: string) {
    this._service = value;
  }


  get fieldList(): Array<Field> {
    return this._fieldList;
  }

  set fieldList(value: Array<Field>) {
    this._fieldList = value;
  }
}
