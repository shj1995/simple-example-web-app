export class FieldType {

  private static fieldTypeList: Array<FieldType>;

  constructor(code: Number, displayAs: String) {
    this.code = code;
    this.displayAs = displayAs;
    FieldType.fieldTypeList.push(this);
  }

  public static String: FieldType = new FieldType(1, '字符串');
  public static Integer: FieldType = new FieldType(2, '整数');
  public static Double: FieldType = new FieldType(3, '双精度');
  public static Boolean: FieldType = new FieldType(4, '布尔');
  public static Date: FieldType = new FieldType(5, '日期');
  public static File: FieldType = new FieldType(6, '文件');
  public static Image: FieldType = new FieldType(7, '图片');
  public static Category: FieldType = new FieldType(7, '选项');

  private readonly code: Number;
  private readonly displayAs: String;

  public getCode(): Number {
    return this.code;
  }

  public getDisplayAs(): String {
    return this.displayAs;
  }

  public static getSelectList(): Array<FieldType> {
    return FieldType.fieldTypeList;
  }

}
