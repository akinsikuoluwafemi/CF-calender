/* eslint-disable react-hooks/exhaustive-deps */

import styles from '@/pages/index.module.css';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context';
import { ActionTypes } from '../ActionTypes';
import { Alert } from 'antd';

import styled from 'styled-components';
import fetchTimeSlots from '../utils/fetchTimeSlots';
import TimeSlotsList from '@/components/TimeSlotsList';
import { useRouter } from 'next/router';
import CFCalender from '@/components/CFCalender';

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

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
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

  useEffect(() => {
    router.push('/');
  }, []);

  const showAlert = state?.showSubmissionAlert;

  const { appointmentNotes, date, time } = state?.selectedTimeSlot;

  const [value, setValue] = useState(new Date());
  const [clicked, setClicked] = useState(false); //change to false later

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
                type: ActionTypes.SHOW_ALERT,
                payload: false,
              });
            }}
          />
        </AlertWrapper>
      )}

      <Container>
        <CFCalender
          value={value}
          setValue={setValue}
          clicked={clicked}
          setClicked={setClicked}
        />

        {clicked && <TimeSlotsList timeSlots={state.timeSlots} />}
      </Container>
    </OuterContainer>
  );
}
