import {Pipe, PipeTransform} from '@angular/core';
import {EventUserStatus} from "../../events/model/event";

@Pipe ({
  name: 'eventUserStatusPipe'
})
export class EventUserStatusPipe implements PipeTransform {
  transform(val: any) : string {
    return TripStatusPretty[val];
  }
}

export const TripStatusPretty = {
  [EventUserStatus.DECLINED]: "Declined",
  [EventUserStatus.CONFIRMED]: "Confirmed",
  [EventUserStatus.CONFIRMATION_PENDING]: "Confirmation pending"
};
