import {Component, Input, OnInit} from '@angular/core';
import {TripsService} from "../../../trips/trips.service";
import {TripStatus, TripUserStatus, TripUserView} from "../../../trips/model/trip";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "../alert/alert.service";

@Component({
  selector: 'app-trip-event-details',
  templateUrl: './trip-event-details.component.html',
  styleUrls: ['./trip-event-details.component.scss']
})
export class TripEventDetailsComponent implements OnInit {

  @Input() id: string;
  form: FormGroup;
  trip: TripUserView;

  constructor(private activeModal: NgbActiveModal,
              private tripService: TripsService,
              private fb: FormBuilder,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.initForm();
    this.loadTrip();
  }

  loadTrip() {
    this.tripService.userView(this.id).subscribe((trip: TripUserView) => {
      this.trip = trip;
      this.form.patchValue(trip);
    });
  }

  initForm() {
    this.form = this.fb.group({
      name: [''],
      status: [''],
      departure: [''],
      sourceAddress: [''],
      residenceAddress: [''],
      carRent: [''],
      flightTicket: ['']
    });
    this.form.disable();
  }

  statusChangeAvailable() {
    if(this.trip) {
      return this.trip.userStatus == TripUserStatus.CONFIRMATION_PENDING && this.trip.status == TripStatus.DRAFT;
    }
    return false;
  }

  confirm() {
    this.tripService.confirmTrip(this.trip.tripId)
      .subscribe(() => {
        this.trip.userStatus = TripUserStatus.CONFIRMED;
        this.activeModal.close(true);
        this.alertService.success('You have confirmed to participate in a trip.');
      });
  }

  decline() {
    this.tripService.declineTrip(this.trip.tripId)
      .subscribe(() => {
        this.trip.userStatus = TripUserStatus.DECLINED;
        this.activeModal.close(false);
        this.alertService.success('You have declined trip participation.');
      });
  }
}
