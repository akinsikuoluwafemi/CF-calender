import {
  ADD_APPOINTMENT,
  FETCH_TIME_SLOTS,
  PICK_DATE,
  SET_APPOINTMENT_NOTE,
  SET_ERROR,
  SET_LOADING,
  SET_SELECTED_TIME_SLOT,
  SHOW_ALERT,
} from 'ActionTypes';
import { Action, State } from 'globalTypes';

const reducer = (state: State, action: Action) => {
  if (action.type === PICK_DATE) {
    return { ...state, clickedDate: action.payload };
  }
  if (action.type === FETCH_TIME_SLOTS) {
    return { ...state, timeSlots: action.payload };
  }
  if (action.type === SET_LOADING) {
    return { ...state, loading: action.payload };
  }
  if (action.type === SET_ERROR) {
    return { ...state, error: action.payload };
  }
  if (action.type === SET_SELECTED_TIME_SLOT) {
    return { ...state, selectedTimeSlot: action.payload };
  }
  if (action.type === SET_APPOINTMENT_NOTE) {
    return { ...state, appointmentNotes: action.payload };
  }
  if (action.type === SHOW_ALERT) {
    return { ...state, showSubmissionAlert: action.payload };
  }
  if (action.type === ADD_APPOINTMENT) {
    return {
      ...state,
      allAppointments: [...state.allAppointments, action.payload],
    };
  }
};

export default reducer;
