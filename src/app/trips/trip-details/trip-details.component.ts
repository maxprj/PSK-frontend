import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TripsService} from '../trips.service';
import {Location} from '@angular/common';
import {ApartmentsService} from '../../apartments/apartments.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {

  formSettings: FormGroup;
  submitted = false;
  reservationNeeded = false;
  apartments: any = [];

  constructor(private formBuilder: FormBuilder,
              private tripsService: TripsService,
              private apartmentsService: ApartmentsService,
              private location: Location) { }

  ngOnInit() {
    this.createForm();
    this.getApartments();
  }

  createForm() {
    this.formSettings = this.formBuilder.group({
      arrival: [''],
      carRent: this.formBuilder.group({
        count: [''],
        ordered: [''],
        price: ['']
      }),
      departure: ['', Validators.required],
      description: [''],
      destination: ['', Validators.required],
      flight: this.formBuilder.group({
        count: [''],
        ordered: [''],
        price: ['']
      }),
      hotel: this.formBuilder.group({
        count: [''],
        ordered: [''],
        price: ['']
      }),
      name: ['', Validators.required],
      reservation: [true],
      otherExpenses: [''],
      reservationBegin: ['', Validators.required],
      reservationEnd: ['', Validators.required],
      source: ['', Validators.required],
      users: this.formBuilder.array([this.addUser()])
    });
  }

  addUser() {
    return this.formBuilder.group({
      inApartment: [''],
      userId: ['', Validators.required]});
  }

  getApartments() {
    this.apartmentsService.getAll().pipe().subscribe(result => {
      this.apartments = result;
    });
  }

  getUsers() {
    
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
    return true;
  }

  isReservationEndInvalid() {
    return true;
  }

  private isReservationDatesValid() {
    const depDate = new Date(this.f.departure.value);
    const aDate = new Date(this.f.reservationBegin.value);
    const bDate = new Date(this.f.reservationEnd.value);
    return aDate.getTime() < bDate.getTime();
  }

  reservationOn() {
    this.reservationNeeded = !this.reservationNeeded;
  }

  isArrivalValid() {
    return true;
  }
}
