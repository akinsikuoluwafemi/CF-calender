import { Action, State } from 'globalTypes';
import React, {
  useReducer,
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useEffect,
} from 'react';
import getLocalStorage from 'utils/getLocalStorage';
import reducer from './reducer';

const initialState: State = {
  loading: false,
  error: '',
  clickedDate: '',
  timeSlots: [],
  selectedTimeSlot: {
    date_time: null as any,
    date: '',
    time: '',
    appointmentNotes: '',
  },

  allAppointments: getLocalStorage('appointments', []),
  showSubmissionAlert: false,
};

const AppContext = createContext<{ state: State; dispatch: Dispatch<Action> }>({
  state: initialState,
  dispatch: () => null,
});

const AppProvider: FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(state.allAppointments));
  }, [state.allAppointments]);

  // console.log(state);
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
