import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-trip-user-add-modal',
  templateUrl: './trip-user-add-modal.component.html',
  styleUrls: ['./trip-user-add-modal.component.scss']
})
export class TripUserAddModalComponent implements OnInit {

  @Input() users: [];
  formSettings: FormGroup;
  submitted = false;
  livesInApartment = true;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.formSettings = this.formBuilder.group({
      inApartment: [true],
      userId: ['', Validators.required],
      flightTicket: [''],
      carRent: [''],
      residenceAddress: ['']});
  }

  residenceSwitch() {
    this.livesInApartment = !this.livesInApartment;
  }

  public submitForm() {
    this.submitted = true;
    if (this.formSettings.invalid) {
      return;
    }
    this.activeModal.close(this.formSettings.value);
  }
}
