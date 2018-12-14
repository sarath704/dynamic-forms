import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSelectAutocompleteComponent } from './form-select-autocomplete.component';

describe('FormSelectAutocompleteComponent', () => {
  let component: FormSelectAutocompleteComponent;
  let fixture: ComponentFixture<FormSelectAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSelectAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSelectAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
