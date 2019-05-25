import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentsDetailsComponent } from './apartments-details.component';

describe('ApartmentsDetailsComponent', () => {
  let component: ApartmentsDetailsComponent;
  let fixture: ComponentFixture<ApartmentsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApartmentsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
