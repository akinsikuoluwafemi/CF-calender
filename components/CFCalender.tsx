import { ActionTypes } from '../ActionTypes';
import { AppContext } from '../context';
import Calendar from 'react-calendar';

import React, { FC, useContext, useEffect, useState, useCallback } from 'react';
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

  const handleClick = useCallback(() => {
    let date = value?.toDateString();

    clicked &&
      dispatch({
        type: ActionTypes.PICK_DATE,
        payload: date,
      });
    fetchTimeSlots(date, dispatch);
  }, [value, clicked, dispatch]);

  useEffect(() => {
    handleClick();
  }, [handleClick]);

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
