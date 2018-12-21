import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatChipList } from '@angular/material';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-chips-input-autocomplete',
  templateUrl: './form-chips-input-autocomplete.component.html',
  styleUrls: ['./form-chips-input-autocomplete.component.scss']
})
export class FormChipsInputAutocompleteComponent implements OnInit, AfterContentInit {
  config;
  group: FormGroup;
  fc: FormArray;

  // internal props
  @ViewChild('chipInput') chipInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('chipList') chipList: MatChipList;
  selectable: boolean;
  removable: boolean;
  autoCompletable: boolean;
  inputType: string;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  chipCtrl = new FormControl();
  filteredChips: Observable<string[]>;
  allChips: any[];
  chips: any[];

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.disableChipListBasedOnSettings();

    this.autoCompletable = this.config.state.autocomplete && this.config.options.length > 0 || false;
    this.allChips = [...this.config.options];
    this.chips = [...this.config.selectedOptions];


    // add required validation if flag config.state.required is true and validations.required is not already present
    this.addValidationRequiredIfNotPresentAndChipsListIsMandatory();

    this.filteredChips = this.chipCtrl.valueChanges.pipe(
      startWith(null),
      map((chip: string | null) => chip ? this._filter(chip) : this.allChips.slice()));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // if value already present clean input and don't add it.
    if (this.valueIsAlreadyPresentInFormArray(this.fc, value)) {
      // reset input value
      this.resetInputValue(input, this.chipCtrl);
      return;
    }

    // Add chip only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      if ((value || '').trim()) {
        const chips = this.fc as FormArray;
        chips.push(this.fb.control(value.trim()));
      }
      // reset input value
      this.resetInputValue(input, this.chipCtrl);
    }
  }

  resetInputValue(input: HTMLInputElement, ctrl: FormControl) {
    if (input) {
      input.value = '';
    }
    ctrl.setValue(null);
  }

  remove(index: number): void {
    const requirements = this.fc as FormArray;
    if (index >= 0) {
      requirements.removeAt(index);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const valueToAdd = event.option.viewValue.trim();
    if (this.valueIsAlreadyPresentInFormArray(this.fc, valueToAdd)) {
      return;
    }
    const chips = this.fc as FormArray;
    chips.push(this.fb.control(event.option.viewValue.trim()));
    // clear input
    this.chipInput.nativeElement.value = '';
  }

  valueIsAlreadyPresentInFormArray(formArray: FormArray, valueToSearchFor) {
    return formArray.controls.some((ctrl: AbstractControl) => ctrl.value === valueToSearchFor);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allChips.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  // programmatically add [Validation.required] if not present and the Chips list is marked as required
  addValidationRequiredIfNotPresentAndChipsListIsMandatory() {
    // if validations field is missing, add it empty
    if (!this.config.validations) {
      this.config.validations = [];
    }
    const hasValidationRequired = this.config.validations.some(eachValidation => eachValidation.type === 'required');
    if (this.config.state.required && !hasValidationRequired) {
      this.config.validations.push({
        'name': 'required',
        'type': 'required',
        'message': 'Value required'
      });
      this.fc.setValidators(Validators.required);
    }
  }

  disableChipListBasedOnSettings() {
    if (this.config.state.disabled) {
      // mark it as not mandatory in case it is
      this.config.state.required = false;
      // remove all validations
      this.config.validations = [];
      // disable chip list
      this.chipList.disabled = true;
      // mark chips as not removable && selectable
      this.selectable = false;
      this.removable = false;
    } else {
      this.selectable = true;
      this.removable = true;
    }
  }
}
