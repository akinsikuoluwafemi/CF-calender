import { FETCH_TIME_SLOTS, PICK_DATE, SET_ERROR, SET_LOADING } from "ActionTypes";
import { Action, State } from "globalTypes";

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
};

export default reducer;
