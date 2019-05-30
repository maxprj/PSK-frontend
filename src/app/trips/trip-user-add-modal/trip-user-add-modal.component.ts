import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserSelectView} from "../../users/_models/user";

@Component({
  selector: 'app-trip-user-add-modal',
  templateUrl: './trip-user-add-modal.component.html',
  styleUrls: ['./trip-user-add-modal.component.scss']
})
export class TripUserAddModalComponent implements OnInit {

  @Input() users: UserSelectView[] = [];
  @Input() canAddToApartment: boolean;
  formSettings: FormGroup;
  submitted = false;
  livesInApartment = true;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.livesInApartment = this.canAddToApartment;
  }

  private createForm() {
    this.formSettings = this.formBuilder.group({
      inApartment: [{value: this.canAddToApartment, disabled: !this.canAddToApartment}],
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
    console.log(this.users);
    console.log(this.formSettings.getRawValue());
    if (this.formSettings.invalid) {
      return;
    }
    this.activeModal.close(this.formSettings.getRawValue());
  }
}
