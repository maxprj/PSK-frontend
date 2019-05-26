import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'multiple-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent {

  @Input() users: [];
  @Input() submitted: boolean;
  @Input() last: boolean;
  @Input() canRemove: boolean;
  @Input() index: any;
  @Input() item: FormGroup;
  @Output() addUserClick = new EventEmitter<any>();
  @Output() removeUserClick = new EventEmitter<any>();
  livesInApartment = true;
  constructor() { }

  addUser() {
    this.addUserClick.emit();
  }

  removeUser() {
    this.removeUserClick.emit();
  }

  residenceSwitch() {
    this.livesInApartment = !this.livesInApartment;
  }

}
