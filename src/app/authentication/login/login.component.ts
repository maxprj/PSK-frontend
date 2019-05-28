import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../authentication.service';
import {AlertService} from '../../shared/components/alert/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PasswordResetComponent } from '../password-reset/password-reset.component';
import { UserRoleEnum } from 'src/app/users/_models/enums/UserRoleEnum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private modalService: NgbModal) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value).pipe(first()).subscribe(data => {
        this.router.navigate([this.getHomePageBaseOnUserRole]);
      },
      error => {
        this.alertService.error(error.error.error_description);
        this.loading = false;
        this.loginForm.reset();
      }
    );
  }

  resetPassword() {
    const modalRef = this.modalService.open(PasswordResetComponent,
      {
        size: 'lg',
        windowClass: 'show'
      });

      modalRef.result.then((result) => {
        this.authenticationService.resetPassword(result).subscribe(data => {});
      });
  }

  get getHomePageBaseOnUserRole() {
    const userRole = this.authenticationService.currentUserRole;

    if (userRole == UserRoleEnum.ROLE_USER) {
      return environment.homePageUrls.user;
    } else if (userRole == UserRoleEnum.ROLE_ORGANIZER) {
      return environment.homePageUrls.organiser;
    } else {
      return environment.homePageUrls.admin;
    }
  }

}
