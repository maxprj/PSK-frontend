import {Component, Input, OnInit} from '@angular/core';
import {TripsService} from '../trips.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-trips-merge-modal',
  templateUrl: './trips-merge-modal.component.html',
  styleUrls: ['./trips-merge-modal.component.scss']
})
export class TripsMergeModalComponent implements OnInit {

  @Input() tripId: string;
  tripsLoaded = false;
  headElements = ['#', 'Name', 'Departure point', 'Destination point', 'Departure time', 'Merge'];
  pageable: any;
  trips: any = [];
  params: any = {
    size: environment.constants.pageSize
  };

  constructor(private tripsService: TripsService,
              public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.getMergableTrips();
  }

  getMergableTrips() {
    this.tripsService.getMergableTrips(this.tripId).pipe().subscribe(result => {
      this.pageable = result;
      this.trips = result.content;
      this.tripsLoaded = true;
    });
  }

  nextPage() {
    this.params.page = this.pageable.number + 1;
    this.getMergableTrips();
  }

  previousPage() {
    this.params.page = this.pageable.number - 1;
    this.getMergableTrips();
  }

  mergeTrip(id) {
    this.tripsService.mergeTrips({tripOne:this.tripId, tripTwo: id}).pipe().subscribe(
      result => {
        this.activeModal.close(result);
      }
    );
  }

}
