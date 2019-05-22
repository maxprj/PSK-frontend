import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentAddModalComponent } from './apartment-add-modal.component';

describe('ApartmentAddModalComponent', () => {
  let component: ApartmentAddModalComponent;
  let fixture: ComponentFixture<ApartmentAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApartmentAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
