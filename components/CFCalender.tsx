import { ActionTypes } from '../ActionTypes';
import { AppContext } from '../context';
import Calendar from 'react-calendar';

import React, { FC, useContext, useEffect, useState } from 'react';
import fetchTimeSlots from '../utils/fetchTimeSlots';
import { useRouter } from 'next/router';
import { CalenderProps } from 'globalTypes';

const CFCalender: FC<CalenderProps> = ({
  value,
  setValue,
  clicked,
  setClicked,
}) => {
  const { state, dispatch } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    let date = value?.toDateString();

    clicked &&
      dispatch({
        type: ActionTypes.PICK_DATE,
        payload: date,
      });
    fetchTimeSlots(date, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div>
      <p>Select a date</p>
      <Calendar
        onChange={() => {
          setValue;
        }}
        onClickDay={(e) => {
          setValue(e);
          setClicked(true);
          router.push('/');
        }}
        value={value}
      />
    </div>
  );
};

export default CFCalender;
