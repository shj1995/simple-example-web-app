import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-toolkit-tree-edit',
  templateUrl: './edit.component.html',
})
export class ToolkitTreeEditComponent implements OnInit {

  form: FormGroup;
  @Input('parentNode') parentNode;
  @Input('node') node;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      parentKey: [null, []],
      key: [null, []],
      name: [null, [Validators.required]],
      num: ['0', [Validators.required]],
      address: ['', []],
    });
  }

  ngOnInit(): void {
    if (this.parentNode) {
      this.form.patchValue({
        parentKey: this.parentNode.key,
        key: Math.random(),
      });
    }
    if(this.node){
      this.form.patchValue(this.node);
    }
  }

  submitForm() {
    for (const key in this.form.controls) {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    }
    if (this.form.valid) {
      return this.form.value;
    } else {
      return null;
    }
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.form.reset();
    for (const key in this.form.controls) {
      this.form.controls[key].markAsPristine();
      this.form.controls[key].updateValueAndValidity();
    }
  }
}
