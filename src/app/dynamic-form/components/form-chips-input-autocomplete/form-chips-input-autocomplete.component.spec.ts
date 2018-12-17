import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormChipsInputAutocompleteComponent } from './form-chips-input-autocomplete.component';

describe('FormChipsInputAutocompleteComponent', () => {
  let component: FormChipsInputAutocompleteComponent;
  let fixture: ComponentFixture<FormChipsInputAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormChipsInputAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormChipsInputAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
