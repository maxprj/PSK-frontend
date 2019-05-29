import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripUserAddModalComponent } from './trip-user-add-modal.component';

describe('TripUserAddModalComponent', () => {
  let component: TripUserAddModalComponent;
  let fixture: ComponentFixture<TripUserAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripUserAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripUserAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
