import { AfterContentInit, Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit, AfterContentInit {
  @HostBinding('classList') _classes: string;
  config;
  group: FormGroup;
  fc: FormControl;

  constructor() {
  }

  ngOnInit() {
    // set host classes
    this._classes = (this.config.classes && this.config.classes.container) ? this.config.classes.container : '';
  }

  ngAfterContentInit() {
    // set checked state for reactive forms.
    // if part of a subgroup retrieve the control from subgroup, otherwise retrieve it from main group
    const controlInitialValue = this.config.value;
    this.fc.setValue(controlInitialValue);
  }

}
