import { Field, Page, PageType, QueryOperator } from '@core';

export class SearchPage {
  id: string;
  name: string;
  title: string;
  displayAs: string;
  description: string;
  type:PageType;
  conditions: Array<QueryCondition>;
  columns: Column[] = [];
  constructor() {
  }
}
export class Column {
  field: Field;
  displayAs: string;
  supportSort: boolean;
  customSchema: boolean;
}
export class QueryCondition {
  field: Field;
  operator: QueryOperator;
}
