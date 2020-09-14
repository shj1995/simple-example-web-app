import { SFUISchemaItem } from '@delon/form';

export interface DMTextWidgetSchema extends SFUISchemaItem {
  /**
   * 当值不存在时所指定的文本，默认：`-`
   */
  defaultText?: string;
}
