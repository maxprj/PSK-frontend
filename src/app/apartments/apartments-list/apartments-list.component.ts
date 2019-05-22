import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../authentication/authentication.service';
import {ApartmentsService} from '../apartments.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from '../../alert/alert.service';
import {ApartmentAddModalComponent} from '../apartment-add-modal/apartment-add-modal.component';

@Component({
  selector: 'app-apartments-list',
  templateUrl: './apartments-list.component.html',
  styleUrls: ['./apartments-list.component.scss']
})
export class ApartmentsListComponent implements OnInit, AfterViewInit {
  public apartmentsLoaded: Boolean = false;
  public deleteLoading: string;
  private pageable: any;
  public apartments: any = [];
  params: any = {
    offset: 0,
    pageNumber: 1,
    pageSize: 20
  };
  headElements = ['ID', 'Name', 'City', 'Street', 'No', 'Size', 'Details', 'Delete'];

  constructor(private authenticationService: AuthenticationService,
              private apartmentsService: ApartmentsService,
              private modalService: NgbModal,
              private alertService: AlertService,
              private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadApartments();
  }

  private loadApartments() {
    this.apartmentsLoaded = false;
    this.apartmentsService.getPaged(this.params).pipe().subscribe(result => {
      this.pageable = result;
      this.apartments = this.pageable.content;
      this.apartmentsLoaded = true;
      this.cdRef.detectChanges();
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
        this.loadApartments();
      });
    }).catch((error) => {

    });
  }

  public deleteApartment(id) {
    this.deleteLoading = id;
    this.apartmentsService.deleteApartment(id).pipe().subscribe(() => {
      this.deleteLoading = null;
      this.loadApartments();
    }, error => {
      this.alertService.error(error.error.message);
    });
  }

  ngAfterViewInit() {

  }

  previousPage() {
    this.params.pageNumber = this.pageable.number--;
    this.loadApartments();
  }

  nextPage() {
    this.params.pageNumber = this.pageable.number + 2;
    this.loadApartments();
  }
}
