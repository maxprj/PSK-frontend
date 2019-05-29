import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TripsService} from '../trips.service';
import {ApartmentsService} from '../../apartments/apartments.service';
import {Location} from '@angular/common';
import {UserService} from '../../users/user.service';
import {ActivatedRoute} from '@angular/router';
import {TripUserAddModalComponent} from '../trip-user-add-modal/trip-user-add-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
  removedUsers: any = [];
  availableUsers: any = [];
  userElements: any = [];
  headElements = ['User', 'Flight ticket', 'Car Rent', 'Residence Address', 'Remove'];
  trip;
  tripLoaded = false;
  tripId: string;
  reservationNeeded = true;

  constructor(private formBuilder: FormBuilder,
              private tripsService: TripsService,
              private apartmentsService: ApartmentsService,
              private location: Location,
              private modalService: NgbModal,
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
      users: this.formBuilder.array([], Validators.required)
    });
  }

  getTrip() {
    this.tripId = this.route.snapshot.paramMap.get('tripId');
    this.tripsService.getTripById(this.tripId).pipe().subscribe(result => {
      this.formSettings.patchValue(result);
      this.userElements = result.users;
      this.userElements.forEach((value) => this.sortRemovedUsers(value));
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

  sortRemovedUsers(user) {
    const obj = this.users.find(e => e.id === user.userId);
    this.removedUsers.push(obj);
    this.availableUsers = this.availableUsers.filter(e => e.id !== user.userId);
  }

  addUser() {
    console.log(this.availableUsers);
    const modalRef = this.modalService.open(TripUserAddModalComponent,
      {
        size: 'lg',
        windowClass: 'show'
      });
    modalRef.componentInstance.users = this.availableUsers;
    modalRef.result.then((result) => {
      this.userElements.push(result);
      const user = this.availableUsers.find(e => e.id === result.userId);
      this.removedUsers.push(user);
      this.availableUsers = this.availableUsers.filter(e => e.id !== result.userId);
    }).catch((error) => {

    });
  }

  getApartments() {
    this.apartmentsService.getAll().pipe().subscribe(result => {
      this.apartments = result;
    });
  }

  getUsers() {
    this.userService.getAll().pipe().subscribe(result => {
      this.users = result;
      this.availableUsers = result;
    });
  }

  get f() {
    return this.formSettings.controls;
  }

  createUser() {
    return this.formBuilder.group({
      inApartment: [true],
      userId: ['', Validators.required],
      flightTicket: [''],
      carRent: [''],
      residenceAddress: ['']});
  }

  onSubmit() {
    this.submitted = true;
    const formArray = <FormArray> this.formSettings.controls['users'];
    this.userElements.forEach(usr => {
      const fb = this.createUser();
      fb.patchValue(usr);
      formArray.push(fb);
    });
    console.log(this.formSettings.getRawValue());
    if (this.formSettings.invalid) {
      return;
    }
    this.tripsService.updateTrip(this.trip.id, this.formSettings.getRawValue()).pipe().subscribe(() => {
      this.location.back();
    });
  }

  getUserNameById(id) {
    const obj = this.users.find(e => e.id === id);
    return obj.name + ' ' + obj.surname;
  }

  removeUserFromList(id) {
    const user = this.removedUsers.find(e => e.id === id);
    this.availableUsers.push(user);
    this.removedUsers = this.removedUsers.filter(e => e.id !== id);
    this.userElements = this.userElements.filter(proj => proj.userId !== id);
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

  compareDates(date1, date2): boolean {
    const aDate = new Date(date1).valueOf();
    const bDate = new Date(date2).valueOf();
    return aDate < bDate;
  }
}
