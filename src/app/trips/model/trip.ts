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

export interface TripDetailsView {
  id: string;
  name: string;
  departure: Date;
  arrival: Date;
  source: TripAddressView;
  destination: TripAddressView;
  destinationId: string;
  description: string;
  reservation: boolean;
  reservationBegin: Date;
  reservationEnd: Date;
  carRent: TripExpensesView;
  flight: TripExpensesView;
  hotel: TripExpensesView;
  otherExpenses: number;
  status: TripStatus;
  users: TripDetailsUserView[];
}

export interface TripExpensesView {
  count: number;
  price: number;
  ordered: boolean;
}

export interface TripAddressView {
  city: string;
  street: string;
  apartmentNumber: string;
}

export interface TripDetailsUserView {
  userId: string;
  inApartment: boolean;
  residenceAddress: string;
  carRent: string;
  flightTicket: string;
}
