import {Pipe, PipeTransform} from '@angular/core';
import {TripStatus} from '../../trips/model/trip';

@Pipe ({
    name: 'tripStatusPipe'
})
export class TripStatusPipe implements PipeTransform {
    transform(val: any) : string {
        return TripStatusPretty[val];
    }
}

export const TripStatusPretty = {
  [TripStatus.CANCELLED]: 'Cancelled',
  [TripStatus.CONFIRMED]: 'Confirmed',
  [TripStatus.DRAFT]: 'Draft',
  [TripStatus.FINISHED]: 'Finished',
  [TripStatus.STARTED]: 'Started',
};
