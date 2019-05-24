import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-apartment-add-modal',
  templateUrl: './apartment-add-modal.component.html',
  styleUrls: ['./apartment-add-modal.component.scss']
})
export class ApartmentAddModalComponent implements OnInit {
  formSettings: FormGroup;
  submitted = false;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.formSettings = this.formBuilder.group({
      name: ['', Validators.required],
      address: this.formBuilder.group({
        appartmentNumber: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required]
      }),
      size: ['', [Validators.required, Validators.min(1)]]
    });
  }

  get f() {
    return this.formSettings.controls;
  }

  public submitForm() {
    this.submitted = true;
    if (this.formSettings.invalid) {
      return;
    }
    this.activeModal.close(this.buildApartmentObject());
  }

  private buildApartmentObject() {
    return this.formSettings.value;
  }

}
