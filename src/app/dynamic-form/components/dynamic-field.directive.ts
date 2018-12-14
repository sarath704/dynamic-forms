import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormInputComponent } from './form-input/form-input.component';
import { FormSelectComponent } from './form-select/form-select.component';
import { FormButtonComponent } from './form-button/form-button.component';
import { FormSelectAutocompleteComponent } from './form-select-autocomplete/form-select-autocomplete.component';
import { FormCheckboxComponent } from './form-checkbox/form-checkbox.component';
import { ListOfControlsComponent } from './list-of-controls/list-of-controls.component';

const components = {
  input: FormInputComponent,
  select: FormSelectComponent,
  button: FormButtonComponent,
  selectAutocomplete: FormSelectAutocompleteComponent,
  checkbox: FormCheckboxComponent,
  subGroup: ListOfControlsComponent
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

  }
}
