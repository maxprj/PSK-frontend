import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "../../../shared/components/alert/alert.service";
import {EventCalendarView, EventUserStatus} from "../../model/event";
import {EventService} from "../../service/event.service";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  form: FormGroup;
  @Input() event: EventCalendarView;

  constructor(private activeModal: NgbActiveModal,
              private eventService: EventService,
              private fb: FormBuilder,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      name: [''],
      description: [''],
      start: [''],
      end: [''],
    });
    this.form.disable();
    this.form.patchValue(event);
  }

  statusChangeAvailable() {
    return this.event.userStatus == EventUserStatus.CONFIRMATION_PENDING;
  }

  confirm() {
    this.eventService.confirm(this.event.id)
      .subscribe(() => {
        this.event.userStatus = EventUserStatus.CONFIRMED;
        this.activeModal.close(true);
        this.alertService.success('You have confirmed to participate in a event.');
      });
  }

  decline() {
    this.eventService.decline(this.event.id)
      .subscribe(() => {
        this.event.userStatus = EventUserStatus.CONFIRMED;
        this.activeModal.close(false);
        this.alertService.success('You have declined event participation.');
      });
  }
}
