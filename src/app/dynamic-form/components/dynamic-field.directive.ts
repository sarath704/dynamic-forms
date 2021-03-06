import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormInputComponent } from './form-input/form-input.component';
import { FormSelectComponent } from './form-select/form-select.component';
import { FormButtonComponent } from './form-button/form-button.component';
import { FormSelectAutocompleteComponent } from './form-select-autocomplete/form-select-autocomplete.component';
import { FormCheckboxComponent } from './form-checkbox/form-checkbox.component';
import { ListOfControlsComponent } from './list-of-controls/list-of-controls.component';
import { FormRadioButtonsGroupComponent } from './form-radio-buttons-group/form-radio-buttons-group.component';
import { FormChipsInputAutocompleteComponent } from './form-chips-input-autocomplete/form-chips-input-autocomplete.component';
import { FormDatepickerComponent } from './form-datepicker/form-datepicker.component';

const components = {
  input: FormInputComponent,
  select: FormSelectComponent,
  button: FormButtonComponent,
  selectAutocomplete: FormSelectAutocompleteComponent,
  checkbox: FormCheckboxComponent,
  subGroup: ListOfControlsComponent,
  radioGroup: FormRadioButtonsGroupComponent,
  chipsAutocomplete: FormChipsInputAutocompleteComponent,
  datepicker: FormDatepickerComponent
};

@Directive({
  selector: '[appDynamicField]'
})
export class DynamicFieldDirective implements OnInit {
  @Input() config;
  @Input() group: FormGroup;
  @Input() subGroup: FormControl;
  @Input() fc: FormControl;
  public component: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver,
              private container: ViewContainerRef) {
  }

  ngOnInit(): void {
    const component = components[this.config.type];
    const factory = this.resolver.resolveComponentFactory(component);
    this.component = this.container.createComponent(factory);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
    this.component.instance.subGroup = this.subGroup;
    this.component.instance.fc = this.fc;

    if (this.config.type === 'chipsAutocomplete') {
      console.log('config', this.config);
      // console.log('group', this.group);
      console.log('fc', this.fc);
    }

  }
}
