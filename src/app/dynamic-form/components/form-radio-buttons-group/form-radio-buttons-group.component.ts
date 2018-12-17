import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';

@Component({
  selector: 'app-form-radio-buttons-group',
  templateUrl: './form-radio-buttons-group.component.html',
  styleUrls: ['./form-radio-buttons-group.component.scss']
})
export class FormRadioButtonsGroupComponent implements OnInit {
  group: FormGroup;
  config;
  fc: FormControl;

  constructor() {}

  ngOnInit() {
    this.setValueToNullIfCurrentValueIsNotInList();
    this.disableGroupBasedOnConfig();
    this.addValidationRequiredIfNotPresentAndGroupIsMandatory();
  }

  disableGroupBasedOnConfig() {
    if (this.config.state.disabled) {
      this.fc.disable({ emitEvent: false });
    }
  }

  // programmatically add [Validation.required] if not present and the radio-group is marked as required
  addValidationRequiredIfNotPresentAndGroupIsMandatory() {
    // if validations field is missing, add it empty
    if (!this.config.validations) {
      this.config.validations = [];
    }
    const hasValidationRequired = this.config.validations.some(eachValidation => eachValidation.type === 'required');
    if (this.config.state.required && !hasValidationRequired) {
      this.config.validations.push({
        'name': 'required',
        'type': 'required',
        'message': 'Selection required'
      });
      // TODO: remind Zori about this new line
      this.fc.setValidators(Validators.required);
    }

  }

  setValueToNullIfCurrentValueIsNotInList() {
    // Overwrite angular material error prone behavior: https://material.angular.io/components/radio/api
    //    @Input() value: any
    //    Value for the radio-group. Should equal the value of the selected radio button if there is a corresponding radio button with a
    //    matching value. If there is not such a corresponding radio button, this value persists to be applied in case a new radio button
    //    is added with a matching value.
    if (!this.config.options.includes(this.config.value)) {
      // log for debugging
      console.log(`RadioGroup [${this.config.name}] preset value ['${this.config.value}'] not present in options list. ` +
      `Resetting it's preset value to [''] `);
      this.config.value = '';
      timer(0)
        .subscribe(() => this.fc.setValue(''));
    }
  }
}
