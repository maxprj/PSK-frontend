import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateValidators} from "../../../shared/validators/date.validator";

@Component({
  selector: 'app-event-add-modal',
  templateUrl: './event-add-modal.component.html',
  styleUrls: ['./event-add-modal.component.scss']
})
export class EventAddModalComponent implements OnInit {

  formSettings: FormGroup;
  submitted = false;
  currentDate = new Date();

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.formSettings = this.formBuilder.group({
      description: ['', Validators.required],
      start: [this.currentDate, Validators.required],
      end: [this.currentDate, Validators.required]
    }, {
      validator: Validators.compose(
        [DateValidators.dateLessThan('start', 'end', {'endDate': true })]
      )
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
    this.activeModal.close(this.formSettings.value);
  }
}
