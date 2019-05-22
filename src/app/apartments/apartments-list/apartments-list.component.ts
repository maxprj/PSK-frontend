import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from '../../authentication/authentication.service';
import {ApartmentsService} from '../apartments.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from '../../alert/alert.service';
import {Apartment} from '../models/apartment';
import {ApartmentAddModalComponent} from '../apartment-add-modal/apartment-add-modal.component';
import {MdbTableDirective, MdbTablePaginationComponent} from 'angular-bootstrap-md';

@Component({
  selector: 'app-apartments-list',
  templateUrl: './apartments-list.component.html',
  styleUrls: ['./apartments-list.component.scss']
})
export class ApartmentsListComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  public apartmentsLoaded: Boolean = false;
  public deleteLoading: string;
  public apartments: Apartment[];
  headElements = ['ID', 'City', 'Street', 'No', 'Size', 'Details', 'Delete'];

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

    this.apartmentsService.getAll().pipe().subscribe(result => {
      this.apartments = result.content;
      this.apartmentsLoaded = true;
      this.mdbTable.setDataSource(this.apartments);
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
      this.apartments.push(result);
      this.apartmentsService.createApartment(result).pipe().subscribe(apartment => {
        this.apartmentsLoaded = true;
      });
    }).catch((error) => {
    });
  }

  public deleteApartment(id) {
    this.deleteLoading = id;
    this.apartmentsService.deleteApartment(id).pipe().subscribe(() => {
      this.apartments = this.apartments.filter(apartment => apartment.id !== id);
      this.deleteLoading = null;
    }, error => {
      this.alertService.error(error.error.message);
    });
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

}
