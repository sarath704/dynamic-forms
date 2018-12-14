import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfControlsComponent } from './list-of-controls.component';

describe('ListOfControlsComponent', () => {
  let component: ListOfControlsComponent;
  let fixture: ComponentFixture<ListOfControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
