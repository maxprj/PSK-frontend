import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TripsService} from '../trips.service';
import {Location} from '@angular/common';
import {ApartmentsService} from '../../apartments/apartments.service';
import {UserService} from '../../users/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TripUserAddModalComponent} from '../trip-user-add-modal/trip-user-add-modal.component';
import {debounceTime, filter, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-add.component.html',
  styleUrls: ['./trip-add.component.scss']
})
export class TripAddComponent implements OnInit {

  formSettings: FormGroup;
  submitted = false;
  reservationNeeded = true;
  apartments: any = [];
  users: any = [];
  removedUsers: any = [];
  availableUsers: any = [];
  tripsInvalid = true;
  canAddToApartment = true;
  headElements = ['User', 'Flight ticket', 'Car Rent', 'Residence Address', 'Remove'];
  userElements = [];
  availablePlaces: any;

  constructor(private formBuilder: FormBuilder,
              private tripsService: TripsService,
              private apartmentsService: ApartmentsService,
              private location: Location,
              private modalService: NgbModal,
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
      reservation: [this.reservationNeeded],
      otherExpenses: [''],
      reservationBegin: [''],
      reservationEnd: [''],
      source: ['', Validators.required],
      users: this.formBuilder.array([], Validators.required)
    });
    this.isReservationAvailable();
  }

  createOtherExpense() {
    return this.formBuilder.group({
      count: [''],
      ordered: [''],
      price: ['']
    });
  }

  addUser() {
    const modalRef = this.modalService.open(TripUserAddModalComponent,
      {
        size: 'lg',
        windowClass: 'show'
      });
    modalRef.componentInstance.users = this.availableUsers;
    modalRef.componentInstance.isApartmentFull = !this.canAddToApartment;
    modalRef.result.then((result) => {
      this.userElements.push(result);
      const user = this.availableUsers.find(e => e.id === result.userId);
      this.removedUsers.push(user);
      this.availableUsers = this.availableUsers.filter(e => e.id !== result.userId);
    }).catch((error) => {

    });
  }

  getUserNameById(id) {
    const obj = this.users.find(e => e.id === id);
    return obj.name + ' ' + obj.surname;
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

  createUser() {
    return this.formBuilder.group({
      inApartment: [true],
      userId: ['', Validators.required],
      flightTicket: [''],
      carRent: [''],
      residenceAddress: ['']});
  }

  get f() {
    return this.formSettings.controls;
  }

  onSubmit() {
    this.submitted = true;
    const formArray = <FormArray> this.formSettings.controls.users;
    this.userElements.forEach(usr => {
      const fb = this.createUser();
      fb.patchValue(usr);
      formArray.push(fb);
    });
    console.log(this.formSettings.value);
    if (this.formSettings.invalid) {
      return;
    }
    this.tripsService.createTrip(this.formSettings.value).pipe().subscribe(() => {
      this.location.back();
    });
  }

  removeUserFromList(id) {
    const user = this.removedUsers.find(e => e.id === id);
    this.availableUsers.push(user);
    this.removedUsers = this.removedUsers.filter(e => e.id !== id);
    this.userElements = this.userElements.filter(proj => proj.id !== id);
  }

  isReservationAvailable() {
    this.formSettings.get('reservationBegin').valueChanges.pipe(
      debounceTime(2000),
      filter(e => this.formSettings.get('destination').value !== null),
      filter(e => this.formSettings.get('reservationEnd').value !== null),
      filter(e => this.reservationNeeded)).subscribe(() => this.getAvailablePlaces());

    this.formSettings.get('reservationEnd').valueChanges.pipe(
      debounceTime(2000),
      filter(e => this.formSettings.get('destination').value !== null),
      filter(e => this.formSettings.get('reservationBegin').value !== null),
      filter(e => this.reservationNeeded)).subscribe(() => this.getAvailablePlaces());

    this.formSettings.get('destination').valueChanges.pipe(
      debounceTime(2000),
      filter(e => this.formSettings.get('reservationBegin').value !== null),
      filter(e => this.formSettings.get('reservationEnd').value !== null),
      filter(e => this.reservationNeeded)).subscribe(() => this.getAvailablePlaces());
  }

  getAvailablePlaces() {
    this.apartmentsService.getAvailablePlaces(this.formSettings.get('destination').value,
      {from: this.formSettings.get('reservationBegin').value,
        till: this.formSettings.get('reservationEnd').value}).pipe().subscribe(result => {
      this.availablePlaces = result;
      this.canAddToApartment = this.availablePlaces.availablePlaces < this.userElements.filter(e => e.inApartment).length;
      console.log(this.canAddToApartment);
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
