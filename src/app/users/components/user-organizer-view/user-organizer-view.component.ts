import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../authentication/authentication.service";
import {environment} from "../../../../environments/environment";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../user.service";
import {AlertService} from "../../../shared/components/alert/alert.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-organizer-view',
  templateUrl: './user-organizer-view.component.html',
  styleUrls: ['./user-organizer-view.component.scss']
})
export class UserOrganizerViewComponent implements OnInit {

  public usersLoaded: Boolean = false;
  private pageable: any;
  public users: any = [];
  params: any = {
    size: environment.constants.pageSize
  };
  headElements = ['No.', 'First Name', 'Last Name', 'Email', 'Availability'];

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
    this.usersService.getPagedActive(this.params).pipe().subscribe(result => {
      this.pageable = result;
      this.users = this.pageable.content;
      this.usersLoaded = true;
      this.cdRef.detectChanges();
    }, error => {
      this.usersLoaded = true;
      this.alertService.error(error.error.message);
    });
  }

  viewCalendar(id: string) {
    this.router.navigate(['events', 'user', id]);
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
