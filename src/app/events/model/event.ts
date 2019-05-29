export interface EventCalendarView {
  id: string;
  name: string;
  description: string;
  start: Date;
  end: Date;
  userStatus: EventUserStatus;
  trip: boolean;
  owner: boolean;
}

export interface EventCreateForm {
  name: string;
  description: string;
  users: string[];
  start: Date;
  end: Date;
}

export interface EventView {
  name: string;
  description: string;
  users: EventUserView[];
  start: Date;
  end: Date;
}

export interface EventUserView {
  id: string;
  name: string;
  surname: string;
  email: string;
  status: EventUserStatus;
}

export enum EventUserStatus {
  CONFIRMATION_PENDING = 'CONFIRMATION_PENDING',
  CONFIRMED = 'CONFIRMED',
  DECLINED = 'DECLINED'
}
