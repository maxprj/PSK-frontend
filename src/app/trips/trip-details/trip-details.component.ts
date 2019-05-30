import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TripsService} from '../trips.service';
import {ApartmentsService} from '../../apartments/apartments.service';
import {Location} from '@angular/common';
import {UserService} from '../../users/user.service';
import {ActivatedRoute} from '@angular/router';
import {TripUserAddModalComponent} from '../trip-user-add-modal/trip-user-add-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime, filter, map} from 'rxjs/operators';
import {TripDetailsView, TripStatus} from "../model/trip";
import {UserAllView, UserSelectView} from "../../users/_models/user";

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
  canAddToApartment = false;
  availablePlaces: any;

  isEditable = true;

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
      destinationId: [''],
      destination: [{value: '', disabled: true}, Validators.required],
      flight: this.createOtherExpense(),
      hotel: this.createOtherExpense(),
      name: ['', Validators.required],
      reservation: [this.reservationNeeded],
      otherExpenses: [''],
      reservationBegin: [''],
      reservationEnd: [''],
      updatedAt: [''],
      source: [{value: '', disabled: true}, Validators.required],
      users: this.formBuilder.array([], Validators.required)
    });
    this.isReservationAvailable();
  }

  getTrip() {
    this.tripId = this.route.snapshot.paramMap.get('tripId');
    this.tripsService.getTripById(this.tripId).pipe().subscribe(result => {
      this.formSettings.patchValue(this.mapToForm(result));
      this.userElements = result.users;
      this.userElements.forEach((value) => this.sortRemovedUsers(value));
      this.trip = result;
      this.isFormEditable(result.status);
      this.formSettings.patchValue({
        source: this.trip.source.street + ' ' + this.trip.source.apartmentNumber + ', ' + this.trip.source.city,
        destination: this.trip.destination.street + ' ' + this.trip.destination.apartmentNumber + ', ' + this.trip.destination.city,
      });
      this.reservationNeeded = result.reservation;
      this.tripLoaded = true;
    });
  }

  mapToForm(t: TripDetailsView) {
    return {
      ...t,
      carRent: t.carRent ? t.carRent : '',
      flight: t.flight ? t.flight : '',
      hotel: t.hotel ? t.hotel : '',
    };
  }

  isReservationAvailable() {
    this.formSettings.get('reservationBegin').valueChanges.pipe(
      debounceTime(1000),
      filter(e => this.formSettings.get('destinationId').value !== ''),
      filter(e => this.formSettings.get('reservationEnd').value !== ''),
      filter(e => this.reservationNeeded)).subscribe(() => this.getAvailablePlaces());

    this.formSettings.get('reservationEnd').valueChanges.pipe(
      debounceTime(1000),
      filter(e => this.formSettings.get('destinationId').value !== ''),
      filter(e => this.formSettings.get('reservationBegin').value !== ''),
      filter(e => this.reservationNeeded)).subscribe(() => this.getAvailablePlaces());
  }

  getAvailablePlaces() {
    this.apartmentsService.getAvailablePlaces(this.formSettings.get('destinationId').value,
      {from: new Date(this.formSettings.get('reservationBegin').value).toISOString(),
        till: new Date(this.formSettings.get('reservationEnd').value).toISOString()}).pipe().subscribe(result => {
      this.availablePlaces = result;
      this.canAddToApartment = this.availablePlaces.availablePlaces > this.userElements.filter(e => e.inApartment).length;
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
    const obj = this.users.find(e => e.userId === user.userId);
    this.removedUsers.push(obj);
    this.availableUsers = this.availableUsers.filter(e => e.userId !== user.userId);
  }

  addUser() {
    const modalRef = this.modalService.open(TripUserAddModalComponent,
      {
        size: 'lg',
        windowClass: 'show'
      });
    modalRef.componentInstance.users = this.availableUsers;
    modalRef.componentInstance.canAddToApartment = this.canAddToApartment;
    modalRef.result.then((result) => {
      this.userElements.push(result);
      const user = this.availableUsers.find(e => e.userId === result.userId);
      this.removedUsers.push(user);
      this.availableUsers = this.availableUsers.filter(e => e.userId !== result.userId);
      this.canAddToApartment = this.availablePlaces.availablePlaces > this.userElements.filter(e => e.inApartment).length;
    }).catch((error) => {

    });
  }

  getApartments() {
    this.apartmentsService.getAll().pipe().subscribe(result => {
      this.apartments = result;
    });
  }

  getUsers() {
    this.userService.getAll().pipe(map(users => this.toSelectView(users)))
      .subscribe(result => {
        this.users = result;
        this.availableUsers = result;
      });
  }

  toSelectView(users: UserAllView[]): UserSelectView[] {
    return users.map(u => {
      return <UserSelectView>{
        userId: u.id,
        name: u.name,
        surname: u.surname
      };
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
    if (this.formSettings.invalid || this.isFormInValid()) {
      return;
    }
    this.tripsService.updateTrip(this.trip.id, this.formSettings.getRawValue()).pipe().subscribe(() => {
      this.location.back();
    });
  }

  getUserNameById(id) {
    const obj = this.users.find(e => e.userId === id);
    if (obj) {
      return obj.name + ' ' + obj.surname;
    }
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

  isFormEditable(status: TripStatus) {
    if (status === TripStatus.STARTED || status === TripStatus.FINISHED || status === TripStatus.CANCELLED) {
      this.formSettings.disable();
      this.isEditable = false;
    }
  }

  isFormInValid() {
    return this.isReservationStartInvalid()
      || this.isReservationEndInvalid()
      || this.isDepartureInvalid();
  }
}
