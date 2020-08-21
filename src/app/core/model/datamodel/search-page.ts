import { Field, Page, PageType, QueryOperator } from '@core';

export class SearchPage {
  private _id: string;
  private _name: string;
  private _title: string;
  private _displayAs: string;
  private _type:PageType;
  private queryConditionList: Array<QueryCondition>;
  private tableFieldList: Array<TableField>;
  constructor() {
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get displayAs(): string {
    return this._displayAs;
  }

  set displayAs(value: string) {
    this._displayAs = value;
  }

  get type(): PageType {
    return this._type;
  }

  set type(value: PageType) {
    this._type = value;
  }
}

class QueryCondition {
  private field: Field;
  private operator: QueryOperator;
}

class TableField {
  private field: Field;
  private displayAs: string;
  private supportSort: boolean;
  private customSchema: boolean;

  private uiSchema: JSON;
}