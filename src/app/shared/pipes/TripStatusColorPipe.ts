import {Pipe, PipeTransform} from '@angular/core';
import {TripStatus} from '../../trips/model/trip';

@Pipe ({
  name: 'tripStatusColorPipe'
})
export class TripStatusColorPipe implements PipeTransform {
  transform(val: any): string {
    console.log(val);
    return TripStatusPretty[val];
  }
}

export const TripStatusPretty = {
  [TripStatus.CANCELLED]: '#ff0000',
  [TripStatus.CONFIRMED]: '#33cc33',
  [TripStatus.DRAFT]: '#ffcc00',
  [TripStatus.FINISHED]: '#2196F3',
  [TripStatus.STARTED]: '#cc00cc',
};
