import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../../user.service';
import {UserRole} from "../../_models/user";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {
  formSettings: FormGroup;
  submitted = false;
  @Input() id;

  public userRoles = Object.values(UserRole);

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private usersService: UserService) { }

  ngOnInit() {
    this.formSettings = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      role: ['', Validators.required],
      updatedAt: ['']
    });

    this.usersService.getById(this.id).pipe().subscribe(result => {
      this.formSettings.patchValue(result);
    });
  }

  public submitForm() {
    this.submitted = true;
    if (this.formSettings.invalid) {
      return;
    }
    this.activeModal.close(this.formSettings.value);
  }

  get f() {
    return this.formSettings.controls;
  }

}
