export interface TimeSlots {
  date_time: Date;
}

export interface State {
  loading: boolean;
  error: string;
  clickedDate: string;
  timeSlots: TimeSlots[]; //change this later
  selectedTimeSlot: any; //change this later
  appointmentReason: string;
  appointmentNotes: string;
}

export interface Action {
  type: string;
  payload?: any;
}
