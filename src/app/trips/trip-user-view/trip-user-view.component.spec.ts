import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TripUserViewComponent} from './trip-user-view.component';

describe('TripUserViewComponent', () => {
  let component: TripUserViewComponent;
  let fixture: ComponentFixture<TripUserViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripUserViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
