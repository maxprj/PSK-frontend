import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripEventDetailsComponent } from './trip-event-details.component';

describe('TripEventDetailsComponent', () => {
  let component: TripEventDetailsComponent;
  let fixture: ComponentFixture<TripEventDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripEventDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
