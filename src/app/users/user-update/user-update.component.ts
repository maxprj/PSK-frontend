import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { UserView } from '../_models/UserView';
import { UserRoleEnumToTextMapping } from '../_models/enums/UserRoleEnumToTextMapping';
import { UserRoleEnum } from '../_models/enums/UserRoleEnum';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {
  formSettings: FormGroup;
  submitted = false;
  @Input() id;
  
  public userRoles = Object.values(UserRoleEnum);

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private usersService: UserService) { }

  ngOnInit() {
    this.formSettings = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      role: ['', Validators.required]
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
