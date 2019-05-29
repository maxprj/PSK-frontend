import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsMergeModalComponent } from './trips-merge-modal.component';

describe('TripsMergeModalComponent', () => {
  let component: TripsMergeModalComponent;
  let fixture: ComponentFixture<TripsMergeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripsMergeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsMergeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
