import { Page, QueryOperator } from '@core';
import { Field } from './field';

export class SearchPage extends Page {
  private queryConditionList: Array<QueryCondition>;
  private tableFieldList: Array<TableField>;
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
