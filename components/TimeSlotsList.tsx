import { TimeSlots } from "globalTypes";
import React, { FC } from "react";
import styled from "styled-components";

const TimeSlotWrapper = styled.div`
  width: 300px;
  height: 500px;
  background: teal;
`;

interface TimeSlotListProps {
  timeSlots: TimeSlots[];
}

const TimeSlotsList: FC<TimeSlotListProps> = ({ timeSlots }) => {
  return <TimeSlotWrapper>TimeSlotsList</TimeSlotWrapper>;
};

export default TimeSlotsList;
