import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRowWrapperComponent } from './form-row-wrapper.component';

describe('FormRowWrapperComponent', () => {
  let component: FormRowWrapperComponent;
  let fixture: ComponentFixture<FormRowWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRowWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRowWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
