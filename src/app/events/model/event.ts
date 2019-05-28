export interface EventCalendarView {
  id: string;
  description: string;
  start: Date;
  end: Date;
  trip: boolean;
  owner: boolean;
}

export interface EventCreateForm {
  description: string;
  start: Date;
  end: Date;
}

