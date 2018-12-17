import { FormButtonComponent } from './components/form-button/form-button.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { NgModule } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFieldDirective } from './components/dynamic-field.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { FormSelectAutocompleteComponent } from './components/form-select-autocomplete/form-select-autocomplete.component';
import { FormCheckboxComponent } from './components/form-checkbox/form-checkbox.component';
import { ListOfControlsComponent } from './components/list-of-controls/list-of-controls.component';
import { FormRadioButtonsGroupComponent } from './components/form-radio-buttons-group/form-radio-buttons-group.component';
import { FormChipsInputAutocompleteComponent } from './components/form-chips-input-autocomplete/form-chips-input-autocomplete.component';

@NgModule({
  declarations: [
    DynamicFormComponent,
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    DynamicFieldDirective,
    FormSelectAutocompleteComponent,
    FormCheckboxComponent,
    ListOfControlsComponent,
    FormRadioButtonsGroupComponent,
    FormChipsInputAutocompleteComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [DynamicFormComponent],
  entryComponents: [
    FormButtonComponent,
    FormInputComponent,
    FormSelectComponent,
    FormSelectAutocompleteComponent,
    FormCheckboxComponent,
    ListOfControlsComponent,
    FormRadioButtonsGroupComponent,
    FormChipsInputAutocompleteComponent
  ]
})
export class DynamicFormModule {
}
