import { PICK_DATE } from 'ActionTypes';
import { AppContext } from 'context';
import Calendar from 'react-calendar';

import React, { FC, useContext, useEffect, useState } from 'react';
import fetchTimeSlots from 'utils/fetchTimeSlots';
import { useRouter } from 'next/router';

interface CalenderProps {
  value: Date;
  setValue: (value: Date) => void;
  clicked: boolean;
  setClicked: (value: boolean) => void;
}

const Calender: FC<CalenderProps> = ({
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
        type: PICK_DATE,
        payload: date,
      });
    fetchTimeSlots(date, dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
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
  );
};

export default Calender;
