import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TripsService} from '../trips.service';
import {Location} from '@angular/common';
import {ApartmentsService} from '../../apartments/apartments.service';
import {UserService} from '../../users/user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TripUserAddModalComponent} from '../trip-user-add-modal/trip-user-add-modal.component';
import {filter} from 'rxjs/operators';
import {UserAllView, UserSelectView} from "../../users/_models/user";
import {map} from "rxjs/internal/operators";

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
  users: UserSelectView[] = [];
  removedUsers: UserSelectView[] = [];
  availableUsers: UserSelectView[] = [];
  tripsInvalid = true;
  canAddToApartment = false;
  headElements = ['User', 'Flight ticket', 'Car Rent', 'Residence Address', 'Remove'];
  userElements = [];
  availablePlaces: any;

  currentDate = new Date();

  constructor(private formBuilder: FormBuilder,
              private tripsService: TripsService,
              private apartmentsService: ApartmentsService,
              private location: Location,
              private modalService: NgbModal,
              private userService: UserService) {
  }

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
    modalRef.componentInstance.canAddToApartment = this.canAddToApartment;
    modalRef.result.then((result) => {
      console.log(result);
      this.userElements.push(result);
      const user = this.availableUsers.find(e => e.userId === result.userId);
      this.removedUsers.push(user);
      this.availableUsers = this.availableUsers.filter(e => e.userId !== result.userId);
      this.canAddToApartment = this.availablePlaces.availablePlaces > this.userElements.filter(e => e.inApartment).length;
    }).catch((error) => {

    });
  }

  getUserNameById(id) {
    const obj = this.users.find(e => e.userId === id);
    if (obj) {
      return obj.name + ' ' + obj.surname;
    }
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
      }
    })
  }

  createUser() {
    return this.formBuilder.group({
      inApartment: [''],
      userId: ['', Validators.required],
      flightTicket: [''],
      carRent: [''],
      residenceAddress: ['']
    });
  }

  get f() {
    return this.formSettings.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.formSettings.invalid || this.isFormInValid()) {
      console.log(this.isFormInValid());
      console.log(this.isDepartureInvalid());
      console.log(this.areTripPointsInvalid());
      console.log(this.isReservationEndInvalid());
      console.log(this.isReservationStartInvalid());
      return;
    }
    const formArray = <FormArray> this.formSettings.controls.users;
    this.userElements.forEach(usr => {
      const fb = this.createUser();
      fb.patchValue(usr);
      formArray.push(fb);
    });
    this.tripsService.createTrip(this.formSettings.value).pipe().subscribe(() => {
      this.location.back();
    });
  }

  removeUserFromList(id) {
    const user = this.removedUsers.find(e => e.userId === id);
    this.availableUsers.push(user);
    this.removedUsers = this.removedUsers.filter(e => e.userId !== id);
    this.userElements = this.userElements.filter(proj => proj.userId !== id);
  }

  isReservationAvailable() {
    this.formSettings.get('reservationBegin').valueChanges.pipe(
      filter(e => this.formSettings.get('destination').value !== ''),
      filter(e => this.formSettings.get('reservationEnd').value !== ''),
      filter(e => this.reservationNeeded)).subscribe(() => this.getAvailablePlaces());

    this.formSettings.get('reservationEnd').valueChanges.pipe(
      filter(e => this.formSettings.get('destination').value !== ''),
      filter(e => this.formSettings.get('reservationBegin').value !== ''),
      filter(e => this.reservationNeeded)).subscribe(() => this.getAvailablePlaces());

    this.formSettings.get('destination').valueChanges.pipe(
      filter(e => this.formSettings.get('reservationBegin').value !== ''),
      filter(e => this.formSettings.get('reservationEnd').value !== ''),
      filter(e => this.reservationNeeded)).subscribe(() => this.getAvailablePlaces());
  }

  getAvailablePlaces() {
    this.apartmentsService.getAvailablePlaces(this.formSettings.get('destination').value,
      {
        from: new Date(this.formSettings.get('reservationBegin').value).toISOString(),
        till: new Date(this.formSettings.get('reservationEnd').value).toISOString()
      }).pipe().subscribe(result => {
      this.availablePlaces = result;
      this.canAddToApartment = this.availablePlaces.availablePlaces > this.userElements.filter(e => e.inApartment).length;
    });
  }

  isFormInValid() {
    return this.isReservationStartInvalid()
      || this.isReservationEndInvalid()
      || this.isDepartureInvalid()
      || this.areTripPointsInvalid();
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
    return this.f.source.value === this.f.destination.value;
  }

  compareDates(date1, date2): boolean {
    const aDate = new Date(date1).valueOf();
    const bDate = new Date(date2).valueOf();
    return aDate < bDate;
  }

  reservationOn() {
    this.reservationNeeded = !this.reservationNeeded;
    this.canAddToApartment = this.reservationNeeded;
  }
}
