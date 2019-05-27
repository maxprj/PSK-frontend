import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TripsService} from '../trips.service';
import {Location} from '@angular/common';
import {ApartmentsService} from '../../apartments/apartments.service';
import {UserService} from '../../users/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-add.component.html',
  styleUrls: ['./trip-add.component.scss']
})
export class TripAddComponent implements OnInit {

  formSettings: FormGroup;
  submitted = false;
  reservationNeeded = false;
  apartments: any = [];
  users: any = [];
  tripsInvalid = true;

  constructor(private formBuilder: FormBuilder,
              private tripsService: TripsService,
              private apartmentsService: ApartmentsService,
              private location: Location,
              private userService: UserService) { }

  ngOnInit() {
    this.createForm();
    this.getApartments();
    this.getUsers();
  }

  createForm() {
    this.formSettings = this.formBuilder.group({
      arrival: [''],
      carRent: this.createOtherExpense(),
      departure: ['', Validators.required],
      description: [''],
      destination: ['', Validators.required],
      flight: this.createOtherExpense(),
      hotel: this.createOtherExpense(),
      name: ['', Validators.required],
      reservation: [true],
      otherExpenses: [''],
      reservationBegin: [''],
      reservationEnd: [''],
      source: ['', Validators.required],
      users: this.formBuilder.array([this.createUser()])
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
    const companies = this.formSettings.get('users') as FormArray;
    companies.push(this.createUser());
  }

  removeUser(index) {
    const companies = this.formSettings.get('users') as FormArray;
    companies.removeAt(index);
  }

  createUser() {
    return this.formBuilder.group({
      inApartment: [true],
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
    console.log(this.formSettings.value);
    if (this.formSettings.invalid) {
      return;
    }
    this.tripsService.createTrip(this.formSettings.value).pipe().subscribe(() => {
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
