import Head from "next/head";
import Image from "next/image";

import styles from "@/pages/index.module.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "context";
import Calendar from "react-calendar";
import {
  PICK_DATE,
  SHOW_ALERT,
} from "ActionTypes";
import { Alert } from "antd";

import styled from "styled-components";
import fetchTimeSlots from "utils/fetchTimeSlots";
import TimeSlotsList from "@/components/TimeSlotsList";
import { useRouter } from "next/router";

const CFHeader = styled.h1`
  text-align: center;
  margin: 0;
  padding: 2rem;
`;

const OuterContainer = styled.div`
  height: 100vh;
  width: 100vw;
  // background: teal;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: start;
`;

const AlertWrapper = styled.div`
  // margin: 0 auto;
  padding: 1rem;
  width: 40%;
  position: absolute;
  top: 0;
  right: 0;
  // height: 10%;
`;

const AlertDescription = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin: 0;
  }
`;

export default function Home() {
  const { state, dispatch } = useContext(AppContext);
  const router = useRouter();

  const showAlert = state?.showSubmissionAlert;

  const { appointmentNotes, date, time } = state?.selectedTimeSlot;

  const [value, setValue] = useState(new Date());
  const [clicked, setClicked] = useState(false); //change to false later

  // console.log(state.selectedTimeSlot);

  useEffect(() => {
    let date = value?.toDateString();

    clicked &&
      dispatch({
        type: PICK_DATE,
        payload: date,
      });
    fetchTimeSlots(date, dispatch);
  }, [value]);

  // console.log(state);

  return (
    <OuterContainer>
      <CFHeader>CF Calendar</CFHeader>

      {showAlert && (
        <AlertWrapper>
          <Alert
            message="Success Text"
            description={
              <AlertDescription>
                <p>Your Call is scheduled for {date}</p>
                <p>Time: {time}</p>
                <p>Notes: {appointmentNotes}</p>
              </AlertDescription>
            }
            type="success"
            closable
            afterClose={() => {
              // dispatch here
              dispatch({
                type: SHOW_ALERT,
                payload: false,
              });
            }}
          />
        </AlertWrapper>
      )}

      <Container>
        <Calendar
          onChange={() => {
            setValue;
          }}
          onClickDay={(e) => {
            setValue(e);
            setClicked(true);
            router.push("/");
          }}
          value={value}
        />

        {clicked && <TimeSlotsList timeSlots={state.timeSlots} />}
      </Container>
    </OuterContainer>
  );
}
