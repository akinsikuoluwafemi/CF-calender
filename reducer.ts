import { ActionTypes } from './ActionTypes';
import { Action, State } from 'globalTypes';

const reducer = (state: State, action: Action) => {
  if (action.type === ActionTypes.PICK_DATE) {
    return { ...state, clickedDate: action.payload };
  }
  if (action.type === ActionTypes.FETCH_TIME_SLOTS) {
    return { ...state, timeSlots: action.payload };
  }
  if (action.type === ActionTypes.SET_LOADING) {
    return { ...state, loading: action.payload };
  }
  if (action.type === ActionTypes.SET_ERROR) {
    return { ...state, error: action.payload };
  }
  if (action.type === ActionTypes.SET_SELECTED_TIME_SLOT) {
    return { ...state, selectedTimeSlot: action.payload };
  }
  if (action.type === ActionTypes.SET_APPOINTMENT_NOTE) {
    return { ...state, appointmentNotes: action.payload };
  }
  if (action.type === ActionTypes.SHOW_ALERT) {
    return { ...state, showSubmissionAlert: action.payload };
  }
  if (action.type === ActionTypes.ADD_APPOINTMENT) {
    return {
      ...state,
      allAppointments: [...state.allAppointments, action.payload],
    };
  }
};

export default reducer;
