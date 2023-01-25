import { Action, State } from "globalTypes";
import React, {
  useReducer,
  createContext,
  Dispatch,
  FC,
  ReactNode,
} from "react";
import reducer from "./reducer";

const initialState: State = {
  loading: false,
  error: "",
  clickedDate: "",
  timeSlots: [],
  selectedTimeSlot: {
    date_time: null,
    date: "",
    time: "",
    appointmentNotes: "",
  },

  allAppointments: [],
  showSubmissionAlert: false,
};

const AppContext = createContext<{ state: State; dispatch: Dispatch<Action> }>({
  state: initialState,
  dispatch: () => null,
});

const AppProvider: FC = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
