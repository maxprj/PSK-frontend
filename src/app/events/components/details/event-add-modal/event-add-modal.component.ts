import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateValidators} from "../../../../shared/validators/date.validator";
import {UserService} from "../../../../users/user.service";
import {UserAllView} from "../../../../users/_models/user";
import {EventCreateForm} from "../../../model/event";
import {USER_VIEW} from "../../../../utils/constants";
import {CurrentUserView} from "../../../../authentication/_models/auth.models";
import {DateAfterTodayValidator} from "../../../../shared/validators/date-after-today.validator";

@Component({
  selector: 'app-event-add-modal',
  templateUrl: './event-add-modal.component.html',
  styleUrls: ['./event-add-modal.component.scss']
})
export class EventAddModalComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  currentDate = new Date();

  availableUsers: UserAllView[] = [];
  selectedUsers: UserAllView[] = [];

  headElements = ['#', 'Name', 'Surname'];

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit() {
    this.initForm();
    this.loadUsers();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      user: [''],
      description: ['', Validators.required],
      start: [this.currentDate, Validators.required],
      end: [this.currentDate, Validators.required]
    }, {
      validator: Validators.compose(
        [
          DateValidators.dateLessThan('start', 'end', {'endDate': true}),
          DateAfterTodayValidator.isAfterToday('start', {'startDate': true})]
      )
    });
  }

  private loadUsers() {
    this.userService.getAll().subscribe(users => {
      if (localStorage.getItem(USER_VIEW) != null) {
        const currentUser: CurrentUserView = JSON.parse(localStorage.getItem(USER_VIEW));
        users = users.filter(u => u.id !== currentUser.id);
      }
      this.availableUsers = users;
    });
  }

  get f() {
    return this.form.controls;
  }

  public submitForm() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    let value: EventCreateForm = {
      name: this.form.get('name').value,
      description: this.form.get('description').value,
      start: this.form.get('start').value,
      end: this.form.get('end').value,
      users: this.selectedUsers.map(u => u.id)
    };

    this.activeModal.close(value);
  }

  removeUser(id: string) {
    const user = this.selectedUsers.find(u => u.id == id);
    this.selectedUsers.splice(this.selectedUsers.indexOf(user), 1);
    this.availableUsers.push(user);
  }

  addUser() {
    const user = this.availableUsers.find(u => u.id == this.form.get('user').value);
    if (user) {
      this.selectedUsers.push(user);
      this.availableUsers.splice(this.availableUsers.indexOf(user), 1);
      if (this.availableUsers.length > 0) {
        this.form.get('user').reset(this.availableUsers[0].id);
      }
    }
  }
}
