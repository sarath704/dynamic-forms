import { AfterContentInit, AfterViewChecked, Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.scss']
})
export class FormCheckboxComponent implements OnInit, AfterContentInit, AfterViewChecked {
  @HostBinding('classList') _classes: string;
  config;
  group: FormGroup;
  fc: FormControl;

  constructor() {
  }
  ngOnInit(): void {
  }

  ngAfterContentInit() {
    // set host classes
    this._classes = (this.config.classes && this.config.classes.container) ? this.config.classes.container : '';

    // set checked state for reactive forms.
    // if part of a subgroup retrieve the control from subgroup, otherwise retrieve it from main group
    const controlInitialValue = this.config.state.checked;
    this.fc.setValue(controlInitialValue);
  }

  ngAfterViewChecked() {

  }
}
