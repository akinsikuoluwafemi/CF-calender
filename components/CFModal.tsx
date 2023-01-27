import React, { FC, useContext, useState } from 'react';
import { Button, Modal } from 'antd';
import styled from 'styled-components';
import { AppContext } from '../context';
import changeTime, { convertTimeToStr, isAmOrPm } from '../utils/convertTime';
import { ActionTypes } from '../ActionTypes';
import { useRouter } from 'next/router';
import { pickedSlot } from '../globalTypes';
import checkAppointments from '../utils/checkAppointments';

const AppointmentNotes = styled.textarea`
  width: 100%;
  height: 100px;
  resize: none;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem 0;
`;

interface CFModalProps {
  setIsModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
  time: Date | string;
  setSelected: (value: boolean) => void;
}

const CFModal: FC<CFModalProps> = ({
  setIsModalOpen,
  isModalOpen,
  time,
  setSelected,
}) => {
  const { state, dispatch } = useContext(AppContext);

  const { allAppointments } = state;

  const router = useRouter();

  const [appointmentNotes, setAppointmentsNotes] = useState<string>('');

  const currentAppointment: pickedSlot = {
    date_time: time,
    date: convertTimeToStr(time),
    time: `${changeTime(time)} ${isAmOrPm(time)}`,
    appointmentNotes,
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelected(false);
  };

  const addAppointments = () => {
    dispatch({
      type: ActionTypes.ADD_APPOINTMENT,
      payload: currentAppointment,
    });
  };

  const handleSubmit = () => {
    setIsModalOpen(false);

    // dispatch here

    dispatch({
      type: ActionTypes.SET_SELECTED_TIME_SLOT,
      payload: currentAppointment,
    });

    // check if appointment already exists
    if (!checkAppointments(allAppointments, currentAppointment)) {
      addAppointments();

      dispatch({
        type: ActionTypes.SHOW_ALERT,
        payload: true,
      });
    }
  };
  const handleOk = () => {
    if (appointmentNotes.length === 0) {
      alert('Pls add a reason for the call 😃');
      return;
    }
    setIsModalOpen(false);
    handleSubmit();
    setSelected(false);

    setAppointmentsNotes('');
    router.push('/');

    setTimeout(() => {
      dispatch({
        type: ActionTypes.SHOW_ALERT,
        payload: false,
      });
    }, 3000);
  };

  return (
    <>
      <Modal
        title="Reason for appointment"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          0,
          // eslint-disable-next-line react/jsx-key
        ].map((btn, i) => (
          <Button key={i} type="primary" onClick={handleOk}>
            Confirm Call
          </Button>
        ))}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          name="reason"
        >
          <label htmlFor="appointmentNote">
            Please share anything that will help prepare for our meeting.
          </label>

          <br />

          <AppointmentNotes
            value={appointmentNotes}
            onChange={(e) => {
              setAppointmentsNotes(e.target.value);
            }}
            name="appointmentNote"
          ></AppointmentNotes>
        </form>
      </Modal>
    </>
  );
};

export default CFModal;
