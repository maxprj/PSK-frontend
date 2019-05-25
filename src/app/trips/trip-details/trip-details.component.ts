import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TripsService} from '../trips.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {

  formSettings: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private tripsService: TripsService,
              private location: Location) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formSettings = this.formBuilder.group({
      arrival: [''],
      carRent: this.formBuilder.group({
        count: [''],
        ordered: [''],
        price: ['']
      }),
      departion: ['', Validators.required],
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
      noReservation: ['', Validators.required],
      otherExpenses: [''],
      reservationBegin: [''],
      reservationEnd: [''],
      source: ['', Validators.required],
      users: this.formBuilder.array([this.formBuilder.group({
        inApartment: [''],
        userId: ['', Validators.required]
      })])
    });
  }

  get f() {
    return this.formSettings.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.formSettings.invalid) {
      return;
    }
    this.tripsService.createTrip(this.formSettings.value).pipe().subscribe(() => {
      this.location.back();
    });
  }
}
