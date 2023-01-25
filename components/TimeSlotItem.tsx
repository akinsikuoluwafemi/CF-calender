import { SET_SELECTED_TIME_SLOT } from "ActionTypes";
import { AppContext } from "context";
import React, { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import changeTime from "utils/convertTime";
import { useRouter } from "next/router";
import CFModal from "./CFModal";

const TimeSlotDisplaySlot = styled.p<{ selected: boolean }>`
  background: #fff;
  text-align: center;
  color: #000;
  font-size: 1rem;
  margin: 1rem;
  padding: 1rem;
  border: ${(props) => (props.selected ? "3px solid green" : "1px solid #000")};
  border-radius: 5px;
  cursor: pointer;
`;

interface TimeSlotItemProps {
  time: Date | string;
  index: number;
  handleClick: (index: number) => void;
  selectedIndex: number;
}

const TimeSlotItem: FC<TimeSlotItemProps> = ({
  time,
  index,
  handleClick,
  selectedIndex,
}) => {
  const { state, dispatch } = useContext(AppContext);

  const router = useRouter();

  const [selected, setSelected] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSelectedTime = (time: Date | string) => {
    const day = new Date(time).getDate();
    const month = new Date(time).getMonth() + 1;
    const year = new Date(time).getFullYear();

    router.push(
      `?&date_time=${time}&year=${year}&month=${month}&day=${day}&time=${changeTime(
        time
      )}`
    );
  };

  return (
    <div>
      <TimeSlotDisplaySlot
        selected={selected && selectedIndex === index ? true : false}
        onClick={() => {
          handleClick(index);
          setSelected(true);
          handleSelectedTime(time);
          showModal();
        }}
      >
        {changeTime(time)}
      </TimeSlotDisplaySlot>
      <CFModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        time={time}
        setSelected={setSelected}
      />
    </div>
  );
};

export default TimeSlotItem;
