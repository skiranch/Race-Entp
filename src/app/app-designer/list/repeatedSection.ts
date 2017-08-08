import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FieldType, FormlyFormBuilder } from 'ng-formly';
import * as clonedeep from 'lodash.clonedeep';

@Component({
  selector: 'formly-repeat-section',
  template: `
    <div class="row" *ngFor="let control of formControl.controls; let i = index;">
      <formly-form
        [model]="model[i]"
        [fields]="fields(i)"
        [options]="newOptions"
        [form]="this.formControl.at(i)"
        [ngClass]="field.fieldArray.fieldGroupClassName">
      </formly-form>

      <div class="pull-left" style="padding-top: 29px;">
        <button class="btn btn-danger btn-xs" (click)="remove(i)">
        <span class="glyphicon glyphicon-remove-circle"></span>
        </button>
      </div>
    </div>
    <div>
      <button class="btn btn-primary" (click)="add()">Add More Tabs</button>
    </div>
  `,
})
export class RepeatComponent extends FieldType implements OnInit {
  formControl: FormArray;
  _fields = [];

  constructor(private builder: FormlyFormBuilder) {
    super();
  }

  get newOptions() {
    return Object.assign({}, this.options);
  }

  get newFields() {
    return clonedeep(this.field.fieldArray.fieldGroup);
  }

  ngOnInit() {
    if (this.model) {
      this.model.map(() => this.add());
    }
  }

  add() {
    const form = new FormGroup({}),
      i = this._fields.length;

    if (!this.model[i]) {
      this.model.push({});
    }

    this._fields.push(this.newFields);
    this.builder.buildForm(form, this._fields[i], this.model[i], this.newOptions);
    this.formControl.push(form);
  }

  remove(i) {
    this.formControl.removeAt(i);
    this.model.splice(i, 1);
    this._fields.splice(i, 1);
  }

  fields(i) {
    if (this._fields[i]) {
      return this._fields[i];
    }

    this._fields.splice(i, 0, this.newFields);

    return this._fields[i];
  }
}