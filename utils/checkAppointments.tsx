import { pickedSlot } from 'globalTypes';

const checkAppointments = (
  allAppointments: pickedSlot[],
  currentAppointment: pickedSlot,
) => {
  const { date_time } = currentAppointment;

  const existingAppointment = allAppointments.find(
    (appointments: pickedSlot) => appointments.date_time === date_time,
  );

  if (existingAppointment) {
    alert('You already have an appointment at this time 🙁');
    return true;
  }
  return false;
};

export default checkAppointments;
