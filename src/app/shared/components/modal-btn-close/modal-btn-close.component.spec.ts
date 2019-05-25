import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBtnCloseComponent } from './modal-btn-close.component';

describe('ModalBtnCloseComponent', () => {
  let component: ModalBtnCloseComponent;
  let fixture: ComponentFixture<ModalBtnCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBtnCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBtnCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
