import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../authentication/authentication.service';
import {ApartmentsService} from '../apartments.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from '../../shared/components/alert/alert.service';
import {ApartmentAddModalComponent} from '../apartment-add-modal/apartment-add-modal.component';
import {ActivatedRoute, Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserRole } from 'src/app/users/_models/user';

@Component({
  selector: 'app-apartments-list',
  templateUrl: './apartments-list.component.html',
  styleUrls: ['./apartments-list.component.scss']
})
export class ApartmentsListComponent implements OnInit {
  public apartmentsLoaded: Boolean = false;
  private pageable: any;
  public apartments: any = [];
  params: any = {
    size: environment.constants.pageSize
  };
  headElements = ['ID', 'Name', 'City', 'Street', 'No', 'Size', 'Reservations', 'Details', 'Delete'];
  isAdmin: boolean;
  isOrganiser: boolean;

  constructor(private authenticationService: AuthenticationService,
              private apartmentsService: ApartmentsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private modalService: NgbModal,
              private alertService: AlertService) {
    this.setVisibilityValues();
    this.removeHeadersForOrganiser();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(result => {
      if (result.page !== undefined) {
        this.params.page = result.page;
      }
      this.loadApartments();
    });
  }

  private loadApartments() {
    this.apartmentsLoaded = false;
    this.router.navigate(['/apartments'], {queryParams: {page: this.params.page}});
    this.apartmentsService.getPaged(this.params).pipe().subscribe(result => {
      this.pageable = result;
      this.apartments = this.pageable.content;
      this.apartmentsLoaded = true;
    }, error => {
      this.apartmentsLoaded = true;
      this.alertService.error(error.error.message);
    });
  }

  public addApartment() {
    const modalRef = this.modalService.open(ApartmentAddModalComponent,
      {
        size: 'lg',
        windowClass: 'show'
      });
    modalRef.result.then((result) => {
      this.apartmentsLoaded = false;
      this.apartmentsService.createApartment(result).pipe().subscribe(apartment => {
        this.params.page = this.pageable.totalPages - 1;
        this.loadApartments();
      });
    }).catch((error) => {
    });
  }

  public deleteApartment(id) {
    this.apartmentsService.deleteApartment(id).pipe().subscribe(() => {
      this.loadApartments();
    }, error => {
      this.alertService.error(error.error.message);
    });
  }

  previousPage() {
    this.params.page = this.pageable.number - 1;
    this.loadApartments();
  }

  nextPage() {
    this.params.page = this.pageable.number + 1;
    this.loadApartments();
  }

  setVisibilityValues() {
    const userRole = this.authenticationService.currentUserRole;
    this.isAdmin = userRole === UserRole.ROLE_ADMIN;
    this.isOrganiser = userRole === UserRole.ROLE_ORGANIZER;
  }

  removeHeadersForOrganiser() {
    if (this.isOrganiser)
    {
      this.headElements.pop();
      this.headElements.pop();
    }
  }
}
