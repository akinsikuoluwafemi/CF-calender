export interface TimeSlots {
  date_time: Date;
}

export interface pickedSlot {
  date_time: Date | string;
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

export interface CalenderProps {
  value: Date;
  setValue: (value: Date) => void;
  clicked: boolean;
  setClicked: (value: boolean) => void;
}
