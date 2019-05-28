import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TripsService} from '../trips.service';
import {ApartmentsService} from '../../apartments/apartments.service';
import {Location} from '@angular/common';
import {UserService} from '../../users/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {

  formSettings: FormGroup;
  submitted = false;
  apartments: any = [];
  users: any = [];
  trip;
  tripLoaded = false;
  tripId: string;
  tripsInvalid = true;
  reservationNeeded = true;

  constructor(private formBuilder: FormBuilder,
              private tripsService: TripsService,
              private apartmentsService: ApartmentsService,
              private location: Location,
              private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit() {
    this.createForm();
    this.getApartments();
    this.getUsers();
    this.getTrip();
  }

  createForm() {
    this.formSettings = this.formBuilder.group({
      arrival: [''],
      carRent: this.createOtherExpense(),
      departure: ['', Validators.required],
      description: [''],
      destination: [{value: '', disabled: true}, Validators.required],
      flight: this.createOtherExpense(),
      hotel: this.createOtherExpense(),
      name: ['', Validators.required],
      reservation: [this.reservationNeeded],
      otherExpenses: [''],
      reservationBegin: [''],
      reservationEnd: [''],
      source: [{value: '', disabled: true}, Validators.required],
      users: this.formBuilder.array([])
    });
  }

  getTrip() {
    this.tripId = this.route.snapshot.paramMap.get('tripId');
    this.tripsService.getTripById(this.tripId).pipe().subscribe(result => {
      this.formSettings.patchValue(result);
      result.users.forEach((value) => this.addPatchedUser(value));
      this.trip = result;
      this.formSettings.patchValue({
        source: this.trip.source.street + ' ' + this.trip.source.apartmentNumber + ', ' + this.trip.source.city,
        destination: this.trip.destination.street + ' ' + this.trip.destination.apartmentNumber + ', ' + this.trip.destination.city,
      });
      this.reservationNeeded = result.reservation;
      this.tripLoaded = true;
    });
  }

  createOtherExpense() {
    return this.formBuilder.group({
      count: [''],
      ordered: [''],
      price: ['']
    });
  }

  addUser() {
    const users = this.formSettings.get('users') as FormArray;
    users.push(this.createUser());
  }

  addPatchedUser(user) {
    const users = this.formSettings.get('users') as FormArray;
    users.push(this.createPatchedUser(user));
  }

  removeUser(index) {
    const users = this.formSettings.get('users') as FormArray;
    users.removeAt(index);
  }

  createPatchedUser(user) {
    const formGroup = this.formBuilder.group({
      inApartment: [{value: '', disabled: user.inApartment}],
      userId: [{value: '', disabled: true}, Validators.required],
      flightTicket: [''],
      carRent: [''],
      residenceAddress: [{value: '', disabled: user.inApartment}]});
    formGroup.patchValue(user);
    return formGroup;
  }

  createUser() {
    return this.formBuilder.group({
      inApartment: [''],
      userId: ['', Validators.required],
      flightTicket: [''],
      carRent: [''],
      residenceAddress: ['']});
  }

  getApartments() {
    this.apartmentsService.getAll().pipe().subscribe(result => {
      this.apartments = result;
    });
  }

  getUsers() {
    this.userService.getAll().pipe().subscribe(result => {
      this.users = result;
    });
  }

  get f() {
    return this.formSettings.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.formSettings.getRawValue());
    if (this.formSettings.invalid) {
      return;
    }
    this.tripsService.updateTrip(this.trip.id, this.formSettings.getRawValue()).pipe().subscribe(() => {
      this.location.back();
    });
  }

  isReservationStartInvalid() {
    return !this.compareDates(this.f.departure.value, this.f.reservationBegin.value);
  }

  isReservationEndInvalid() {
    return !this.compareDates(this.f.reservationBegin.value, this.f.reservationEnd.value);
  }

  isArrivalValid() {
    return !this.compareDates(this.f.departure.value, this.f.arrival.value);
  }

  isDepartureInvalid() {
    return !this.compareDates(Date.now(), this.f.departure.value);
  }

  areTripPointsInvalid() {
    this.tripsInvalid = this.f.source.value === this.f.destination.value;
  }

  compareDates(date1, date2): boolean {
    const aDate = new Date(date1).valueOf();
    const bDate = new Date(date2).valueOf();
    return aDate < bDate;
  }

  reservationOn() {
    this.reservationNeeded = !this.reservationNeeded;
  }
}
