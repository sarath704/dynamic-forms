import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRadioButtonsGroupComponent } from './form-radio-buttons-group.component';

describe('FormRadioButtonsGroupComponent', () => {
  let component: FormRadioButtonsGroupComponent;
  let fixture: ComponentFixture<FormRadioButtonsGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRadioButtonsGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRadioButtonsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
