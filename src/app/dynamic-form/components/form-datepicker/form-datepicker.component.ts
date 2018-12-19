import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';

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

  public preselectedDate: Date;
  public minimumSelectableDate: Date;
  public maximumSelectableDate: Date;
  public datePickerFilter: Function;
  public startViewAt: Date;
  public startView: string;

  constructor() {
  }

  ngOnInit() {
    // add required validation if state.required is true and validation is missing
    this.addValidationRequiredIfNotPresentAndDatePickerIsRequired();

    // initialize the data used in template
    this.initData();
    this.initStartView();
    this.setDateFilter();
  }

  initData() {
    // handle default value
    const ctrl = this.config.name;
    const defaultVal = this.config.value;
    if (!(defaultVal && this.isValidDate(defaultVal))) {
      console.log(`${ctrl}: Values provided in config.value cannot compose a date. Using null instead.`);
    }
    const predefinedDate = (defaultVal && this.isValidDate(defaultVal)) ? defaultVal : null;
    this.preselectedDate = this.composeDate(predefinedDate);
    timer(0).subscribe(() => this.fc.setValue(this.preselectedDate));

    // handle minimum date
    const minSelectable = this.config.constraints && this.config.constraints.minimumSelectableDate ?
      this.config.constraints.minimumSelectableDate : null;
    const isMinimumSelectableDateValid = minSelectable && this.isValidDate(minSelectable);
    if (!isMinimumSelectableDateValid) {
      console.log(`${ctrl}: Values provided in field [constraints.minimumSelectableDate] cannot compose a date. Using null instead.`);
    }
    const minDate = (isMinimumSelectableDateValid) ? minSelectable : null;
    this.minimumSelectableDate = this.composeDate(minDate);

    // handle maximum date
    const maxSelectable = (this.config.constraints && this.config.constraints.maximumSelectableDate) ?
      this.config.constraints.maximumSelectableDate : null;
    const isMaximumSelectableValid = maxSelectable && this.isValidDate(maxSelectable);
    if (!isMaximumSelectableValid) {
      console.log(`${ctrl}: Values provided in field [constraints.minimumSelectableDate] cannot compose a date. Using null instead.`);
    }
    const maxDate = (isMaximumSelectableValid) ? maxSelectable : null;
    this.maximumSelectableDate = this.composeDate(maxDate);

    // handle startViewAt date
    const startViewAtObj = (this.config.constraints && this.config.constraints.startViewDate) ?
      this.config.constraints.startViewDate : null;
    const isStartViewAtValid = startViewAtObj && this.isValidDate(startViewAtObj);
    if (!isStartViewAtValid) {
      console.log(`${ctrl}: Values provided in field [constraints.startViewDate] cannot compose a date. Using null instead.`);
    }
    const startViewAtDate = (isStartViewAtValid) ? startViewAtObj : null;
    this.startViewAt = this.composeDate(startViewAtDate);

    console.log('this.preselectedDate', this.preselectedDate);
    console.log('this.minimumSelectableDate', this.minimumSelectableDate);
    console.log('this.maximumSelectableDate', this.maximumSelectableDate);
    console.log('this.startViewAt', this.startViewAt);
  }

  initStartView() {
    // possible values for startView: 'month' | 'year' | 'multi-year'
    const startViewConfig = (this.config.constraints && this.config.constraints.startView) ? this.config.constraints.startView : null;
    this.startView = ['month', 'year', 'multi-year'].includes(startViewConfig) ? startViewConfig : 'month';
    console.log(`startView`, this.startView);
  }

  composeDate(customDate: CustomDateObj) {
    return customDate ? new Date(customDate.year, customDate.month - 1, customDate.day) : null;
  }

  isValidDate(testDate: CustomDateObj) {
    const validMonths = Array.from({ length: 12 }, (v, i) => i + 1);
    const validDays = Array.from({ length: 31 }, (v, i) => i + 1);
    return testDate.year &&
      (testDate.month && validMonths.includes(testDate.month)) &&
      (testDate.day && validDays.includes(testDate.day));
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
      this.config.validations.push({
        'name': 'required',
        'type': 'required',
        'message': 'Date selection required'
      });
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
