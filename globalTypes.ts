export interface TimeSlots {
  date_time: Date;
}

export interface pickedSlot {
  date_time: Date | null;
  date: string;
  time: string;
  appointmentNotes: string;
}

export interface State {
  loading: boolean;
  error: string;
  clickedDate: string;
  timeSlots: TimeSlots[]; //change this later
  selectedTimeSlot: pickedSlot;
  showSubmissionAlert: boolean;
  allAppointments: pickedSlot[];
}

export interface Action {
  type: string;
  payload?: any;
}
