import { AppContext } from '../context';
import { TimeSlots } from '../globalTypes';
import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import changeTime from '../utils/convertTime';
import TimeSlotItem from './TimeSlotItem';

const TimeDisplay = styled.span`
  font-size: 1rem;
  text-align: center;
  margin: 1rem;
  font-weight: 500;
`;

const TimeSlotContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TimeSlotWrapper = styled.div`
  width: 300px;
  height: auto;
  background: #ddd;
  padding: 1rem;
`;

interface TimeSlotListProps {
  timeSlots: TimeSlots[];
}

const TimeSlotsList: FC<TimeSlotListProps> = ({ timeSlots }) => {
  //   console.log(timeSlots);
  const { state, dispatch } = useContext(AppContext);
  const { loading, error } = state;
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    // console.log(index);
  };

  return (
    <TimeSlotContainer>
      <TimeDisplay>
        {state.clickedDate ? state.clickedDate : 'No date selected'}
      </TimeDisplay>
      <TimeSlotWrapper>
        {timeSlots.length === 0 && <p>No session(s) available</p>}

        {loading && <p>Loading...</p>}

        {error ? (
          <p>{error}</p>
        ) : (
          <>
            {timeSlots.map((time: { date_time: Date }, index: number) => {
              return (
                <TimeSlotItem
                  key={changeTime(time.date_time)}
                  time={time.date_time}
                  index={index}
                  handleClick={handleClick}
                  selectedIndex={selectedIndex}
                />
              );
            })}
          </>
        )}
      </TimeSlotWrapper>
    </TimeSlotContainer>
  );
};

export default TimeSlotsList;
