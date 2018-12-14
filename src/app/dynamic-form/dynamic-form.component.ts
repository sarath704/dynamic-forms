import { AfterContentInit, Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { pluck, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, AfterContentInit {
  @Input() config: any[] = [];
  @Input() configId: string;
  @Input() initialValues: any;
  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();
  @HostBinding('class.dynamic-form-container') _class = true;

  public form: FormGroup;

  constructor(private fb: FormBuilder,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.grabConfigFromServerIfConfigIdReceivedFromParent();
  }

  ngAfterContentInit(): void {
    timer(0).subscribe(() => this.setFormValues());
    // this.setFormValues();
    // this.cd.markForCheck();
  }

  grabConfigFromServerIfConfigIdReceivedFromParent() {
    // configId has priority over config to be able to combine multiple forms through content projection
    if (this.configId) {
      this.getTemplate(this.configId)
        .subscribe(template => {
            this.config = template;
            this.form = this.createGroup();
          }
        );
    } else {
      this.form = this.createGroup();

    }
  }

  getTemplate(id): Observable<any> {
    return this.http.post('http://0.0.0.0:7777/api/v1/templates/get-template', { templateId: id })
      .pipe(
        retry(3),
        pluck('templateContent')
      );
  }

  createGroup() {
    let group = this.fb.group({});
    group = this.addControlsBasedOnConfig(this.config, group);
    console.log(`final group`, group);
    return group;
  }

  addControlsBasedOnConfig(configPath, group): FormGroup {
    configPath.forEach((field, idx) => {
      // treat each control type individually because of their differences
      let control;
      switch (field.type.toLowerCase()) {
        case 'button':
          return;
        case 'checkbox':
          control = new FormControl({
              value: '',
              disabled: field.state.disabled
            },
            this.composeValidators(field.validations || []));
          group.addControl(field.name, control);
          break;
        case 'subgroup':
          let subgroup = this.fb.group({});
          subgroup = this.addControlsBasedOnConfig(field.controls, subgroup);
          group.addControl(field.name, subgroup);
          break;
        default:
          control = new FormControl(field.value || '', this.composeValidators(field.validations || []));
          group.addControl(field.name, control);
      }
    });
    return group;
  }

  composeValidators(validations: any) {
    const validators: ValidatorFn[] = [];
    validations.forEach(validation => {
      switch (validation.type) {
        case 'required':
          validators.push(Validators.required);
          break;
        case 'minLength':
          validators.push(Validators.minLength(parseInt(validation.expression, 10)));
          break;
        case 'maxLength':
          validators.push(Validators.maxLength(parseInt(validation.expression, 10)));
          break;
        case 'pattern':
          // console.log(`==============validation.expression.pattern`, validation.expression);
          validators.push(Validators.pattern(new RegExp(validation.expression)));
          break;
        case 'custom':
          // to implement if needed
          break;
      }
    });
    return Validators.compose(validators);
  }

  setFormValues() {
    if (this.initialValues) {
      this.form.setValue(this.initialValues);
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      // using getRawValue() to return values for disabled controls also
      this.submitted.emit(this.form.getRawValue());
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      // handle subgroup
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormControl) {
        // const control = formGroup.get(field);
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

}
