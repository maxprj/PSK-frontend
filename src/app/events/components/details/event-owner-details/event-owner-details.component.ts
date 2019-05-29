import {Component, Input, OnInit} from '@angular/core';
import {EventView} from "../../../model/event";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {EventService} from "../../../service/event.service";

@Component({
  selector: 'app-event-owner-details',
  templateUrl: './event-owner-details.component.html',
  styleUrls: ['./event-owner-details.component.scss']
})
export class EventOwnerDetailsComponent implements OnInit {

  form: FormGroup;
  event: EventView;
  @Input() id: string;

  headElements = ['#', 'Name', 'Surname', 'Email', 'Status'];

  constructor(private activeModal: NgbActiveModal,
              private eventService: EventService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
    this.loadEvent();
  }

  initForm() {
    this.form = this.fb.group({
      name: [''],
      description: [''],
      start: [''],
      end: [''],
    });
    this.form.disable();
  }

  loadEvent() {
    this.eventService.get(this.id).subscribe(e => {
      this.form.patchValue(e);
      this.event = e;
    });
  }

  hasUsers() {
    if(this.event) {
      return this.event.users.length > 0;
    }
    return false;
  }
}
