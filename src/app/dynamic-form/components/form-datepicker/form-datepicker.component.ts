import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { Validation } from './form-datepicker.config.model';
import { filter } from 'rxjs/operators';

export interface CustomDateObj {
  year: number;
  month: number;
  day: number;
}

@Component({
  selector: 'app-form-datepicker',
  templateUrl: './form-datepicker.component.html',
  styleUrls: ['./form-datepicker.component.scss']
})
export class FormDatepickerComponent implements OnInit {
  config;
  group: FormGroup;
  fc: FormControl;

  public preselectedDate: Date | null;
  public minimumSelectableDate: Date | null;
  public maximumSelectableDate: Date | null;
  public datePickerFilter: Function;
  public startViewAt: Date | null;
  public startView: string;

  constructor() {
  }

  ngOnInit() {
    // add required validation if state.required is true and validation is missing
    this.addValidationRequiredIfNotPresentAndDatePickerIsRequired();

    if (this.config.name === 'datepicker8') {
      console.log(this.config.name, ' - config after required=true ');
      console.log(this.config);
    }
    // initialize the data used in template
    this.initData();
    this.setDateFilter();
  }

  initData() {
    // handle default value
    this.preselectedDate = this.composeDate(this.config.value);
    if (this.config.name === 'datepicker8') {
      console.log('preselected date: ', this.preselectedDate);
    }
    timer(0).pipe(filter(() => !!this.preselectedDate)).subscribe(() => {
      if (this.config.name === 'datepicker8') {
        console.log(`setting value datepicker8`);
      }
      this.fc.setValue(this.preselectedDate);
    });
    this.minimumSelectableDate = this.composeDate(this.config.constraints.minimumSelectableDate);
    this.maximumSelectableDate = this.composeDate(this.config.constraints.maximumSelectableDate);
    this.startViewAt = this.composeDate(this.config.constraints.startViewDate);
    this.startView = this.config.constraints.startView;

    // console.log('this.preselectedDate', this.preselectedDate);
    // console.log('this.minimumSelectableDate', this.minimumSelectableDate);
    // console.log('this.maximumSelectableDate', this.maximumSelectableDate);
    // console.log(`startView`, this.startView);
    // console.log('this.startViewAt', this.startViewAt);
  }

  composeDate(customDate: CustomDateObj) {
    return customDate ? new Date(customDate.year, customDate.month - 1, customDate.day) : null;
  }

  setDateFilter() {
    // const allowedFilters = ['allowAllDays', 'onlyWorkingDays', 'onlyWeekends'];

    const allowedSelection = (this.config.constraints && this.config.constraints.allowSelection) ?
      this.config.constraints.allowSelection : '';

    switch (allowedSelection) {
      case 'onlyWorkingDays':
        this.datePickerFilter = this.onlyWorkingDays;
        break;
      case 'onlyWeekends':
        this.datePickerFilter = this.onlyWeekends;
        break;
      default:
        this.datePickerFilter = this.allowAllDays;
        break;
    }
  }

  // programmatically add [Validation.required] if not present and the Chips list is marked as required
  addValidationRequiredIfNotPresentAndDatePickerIsRequired() {
    // if validations field is missing, add it empty
    if (!this.config.validations) {
      this.config.validations = [];
    }
    const hasValidationRequired = this.config.validations.some(eachValidation => eachValidation.type === 'required');
    if (this.config.state.required && !hasValidationRequired) {
      this.config.validations.push(new Validation({
        'name': 'required',
        'type': 'required',
        'expression': '',
        'message': 'Date selection required'
      }));
      console.log(this.config.validations);
      this.fc.setValidators(Validators.required);
    }
  }

  // custom date filters
  allowAllDays(d: Date) {
    return true;
  }

  onlyWorkingDays(d: Date) {
    const day = d.getDay();
    return day !== 0 && day !== 6;
  }

  onlyWeekends(d: Date) {
    const day = d.getDay();
    return day === 0 || day === 6;
  }
}
