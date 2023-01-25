import Head from "next/head";
import Image from "next/image";

import styles from "@/pages/index.module.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "context";
import Calendar from "react-calendar";
import {
  FETCH_TIME_SLOTS,
  PICK_DATE,
  SET_ERROR,
  SET_LOADING,
} from "ActionTypes";
import axios from "axios";
import styled from "styled-components";
import fetchTimeSlots from "utils/fetchTimeSlots";
import TimeSlotsList from "@/components/TimeSlotsList";

const CFHeader = styled.h1`
  text-align: center;
  margin: 0;
  padding: 2rem;
`;

const OuterContainer = styled.div`
  height: 100vh;
  width: 100vw;
  // background: teal;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: start;
`;

export default function Home() {
  const { state, dispatch } = useContext(AppContext);

  const [value, setValue] = useState(new Date());
  const [clicked, setClicked] = useState(true); //change to false later

  useEffect(() => {
    let date = value?.toDateString();
    dispatch({
      type: PICK_DATE,
      payload: date,
    });
    fetchTimeSlots(date, dispatch);
  }, [value]);

  console.log(state);

  return (
    <OuterContainer>
      <CFHeader>CF Calendar</CFHeader>
      <Container>
        <Calendar
          onChange={() => {
            setValue;
            // console.log(value.getDate());
          }}
          onClickDay={(e) => {
            // console.log(e.getDate());
            setValue(e);
            setClicked(true);
          }}
          value={value}
        />

        {clicked && <TimeSlotsList timeSlots={state.timeSlots} />}
      </Container>
    </OuterContainer>
  );
}
