import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/alert/alert.service';
import { UserService } from '../user.service';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UserUpdateComponent } from '../user-update/user-update.component';
import { environment } from 'src/environments/environment';
import { UserRoleEnumToTextMapping } from '../_models/enums/UserRoleEnumToTextMapping';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public usersLoaded: Boolean = false;
  private pageable: any;
  public users: any = [];
  params: any = {
    size: environment.constants.pageSize
  };
  headElements = ['No.', 'First Name', 'Last Name', 'Email', 'Role', 'Creation date', 'Status', 'Update'];

  public UserRoleEnumToTextMapping = UserRoleEnumToTextMapping;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private modalService: NgbModal,
              private alertService: AlertService,
              private cdRef: ChangeDetectorRef,
              private usersService: UserService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(result => {
      if (result.page !== undefined) {
        this.params.page = result.page;
      }
      this.loadUsers();
    });
  }

  private loadUsers() {
    this.usersLoaded = false;
    this.router.navigate(['/users'], {queryParams: {page: this.params.page}});
    this.usersService.getPaged(this.params).pipe().subscribe(result => {
      this.pageable = result;
      this.users = this.pageable.content;
      this.usersLoaded = true;
      this.cdRef.detectChanges();
    }, error => {
      this.usersLoaded = true;
      this.alertService.error(error.error.message);
    });
  }

  public addUser() {
    const modalRef = this.modalService.open(UserCreateComponent,
      {
        size: 'lg',
        windowClass: 'show'
      });
    modalRef.result.then((result) => {
      this.usersLoaded = false;
      this.usersService.createUser(result).pipe().subscribe(user => {
        this.params.page = 0;
        this.loadUsers();
      });
    }).catch((error) => {

    });
  }

  public updateUser(id) {
    const modalRef = this.modalService.open(UserUpdateComponent,
      {
        size: 'lg',
        windowClass: 'show'
      });

    modalRef.componentInstance.id = id;
    
    modalRef.result.then((result) => {
      this.usersLoaded = false;
      this.usersService.updateUser(id, result).pipe().subscribe(user => {
        this.params.page = 0;
        this.loadUsers();
      });
    }).catch((error) => {
      
    });
  }

  previousPage() {
    this.params.page = this.pageable.number - 1;
    this.loadUsers();
  }

  nextPage() {
    this.params.page = this.pageable.number + 1;
    this.loadUsers();
  }

}
