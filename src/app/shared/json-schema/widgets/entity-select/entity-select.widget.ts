import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { DMEntitySelectWidgetSchema } from './schema';
import { ControlUIWidget, getData, SFSchemaEnum, SFValue, toBool } from '@delon/form';
import { map } from 'rxjs/operators';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'sf-select',
  templateUrl: './entity-.widget.html',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
})
export class DMEntitySelectWidget extends ControlUIWidget<DMEntitySelectWidgetSchema> implements OnInit {
  static readonly KEY = 'dm-entity-select';
  i: DMEntitySelectWidgetSchema;
  data: SFSchemaEnum[];
  _value: NzSafeAny;
  hasGroup = false;

  ngOnInit(): void {
    this.ui.asyncData = this.asyncData;
    const {
      autoClearSearchValue,
      borderless,
      autoFocus,
      dropdownMatchSelectWidth,
      serverSearch,
      maxMultipleCount,
      mode,
      showSearch,
      tokenSeparators,
      maxTagCount,
      optionHeightPx,
      optionOverflowSize,
    } = this.ui;
    this.i = {
      autoClearSearchValue: toBool(autoClearSearchValue, true),
      borderless: toBool(borderless, false),
      autoFocus: toBool(autoFocus, false),
      dropdownMatchSelectWidth: toBool(dropdownMatchSelectWidth, true),
      serverSearch: toBool(serverSearch, false),
      maxMultipleCount: maxMultipleCount || Infinity,
      mode: mode || 'default',
      showSearch: toBool(showSearch, true),
      tokenSeparators: tokenSeparators || [],
      maxTagCount: maxTagCount || undefined,
      optionHeightPx: optionHeightPx || 32,
      optionOverflowSize: optionOverflowSize || 8,
      compareWith: (v1, v2) => {
        return v1 && v2 && v1.id === v2.id;
      },
    };
  }

  reset(value: SFValue) {
    getData(this.schema, this.ui, value).subscribe(list => {
      this._value = value;
      this.data = list;
      this.checkGroup(list);
      this.detectChanges();
    });
  }

  change(values: SFValue) {
    if (this.ui.change) {
      this.ui.change(values,this.getOrgData(values), this.formProperty.parent);
    }
    this.setValue(values == null ? undefined : values);
  }

  openChange(status: boolean) {
    if (this.ui.openChange) {
      this.ui.openChange(status);
    }
  }

  searchChange(text: string) {
    if (this.ui.onSearch) {
      this.ui.onSearch(text).then((list: SFSchemaEnum[]) => {
        this.data = list;
        this.checkGroup(list);
        this.detectChanges();
      });
      return;
    }
    this.detectChanges();
  }

  scrollToBottom() {
    if (this.ui.scrollToBottom) {
      this.ui.scrollToBottom();
    }
  }

  private checkGroup(list: SFSchemaEnum[]): void {
    this.hasGroup = (list || []).filter(w => w.group === true).length > 0;
  }

  private asyncData = () => {
    if (!this.ui.display){
      this.ui.display = '`${v.name}`'
    }
    return this.injector.get<_HttpClient>(_HttpClient).get(this.getSourceUrl()).pipe(
      map((value: any) => {
        return value.map((v) => {
          return {
            label:  eval(this.ui.display),
            value: v,
            key: v,
          };
        });
      }));
  };

  private getOrgData(values: SFValue): SFSchemaEnum | SFSchemaEnum[] {
    if (!Array.isArray(values)) {
      return this.data.find(w => w.value === values)!;
    }
    return values.map(value => {
      let item: SFSchemaEnum | null = null;
      this.data.forEach(list => {
        item = list.children?.find(w => w.value === value)!;
      });
      return item;
    });
  }

  private getSourceUrl() {
    let sourceUrl = '';
    if (this.ui.sourceUrl) {
      sourceUrl = this.ui.sourceUrl;
    } else if (this.ui.source) {
      // TODO 接口待完善
      sourceUrl = '';
    }
    return sourceUrl;
  }
}
