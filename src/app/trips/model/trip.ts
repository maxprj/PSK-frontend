export interface TripUserView {
  tripId: string;
  name: string;
  status: TripStatus;
  departure: Date;
  sourceAddress: string;
  residenceAddress: string;
  carRent: string;
  flightTicket: string;
  userStatus: TripUserStatus;
}

export enum TripStatus {
  DRAFT = 'DRAFT',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED'
}

export enum TripUserStatus {
  CONFIRMATION_PENDING = 'CONFIRMATION_PENDING',
  CONFIRMED = 'CONFIRMED',
  DECLINED = 'DECLINED'
}
