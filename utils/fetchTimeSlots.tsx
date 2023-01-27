import { ActionTypes } from '../ActionTypes';
import axios from 'axios';
import { Dispatch } from 'react';

const url =
  'https://private-37dacc-cfcalendar.apiary-mock.com/mentors/1/agenda';

async function fetchTimeSlots(date: string, dispatch: Dispatch<any>) {
  try {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true });
    const response = await axios.get(url);
    const { data } = response;
    dispatch({ type: ActionTypes.SET_LOADING, payload: false });

    const timeSlots = data.calendar.filter((slots: { date_time: Date }) => {
      return new Date(slots.date_time).toDateString() === date;
    });
    // console.log(timeSlots);
    dispatch({ type: ActionTypes.FETCH_TIME_SLOTS, payload: timeSlots });
  } catch (error: any) {
    dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    console.log(error.message);
  }
}

export default fetchTimeSlots;
