import TimeSlotItem from '@/components/TimeSlotItem';
import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('next/router', () => require('next-router-mock'));

describe('TimeSlotItem', () => {
  const time = new Date();
  const index = 0;
  const handleClick = jest.fn();
  const selectedIndex = 0;

  let selectedSlots: any = [];

  const selectSlot = (slot: any) => {
    selectedSlots.push(slot);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    render(
      <TimeSlotItem
        time={time}
        index={index}
        handleClick={handleClick}
        selectedIndex={selectedIndex}
      />,
    );
  });

  it('renders a time slot item', async () => {
    const timeSlotItem = await screen.findAllByRole('button');
    // console.log(timeSlotItem);

    expect(timeSlotItem).toHaveLength(1);
  });

  it('should call handleClick when clicked', async () => {
    const timeSlotItem = await screen.findAllByRole('button');

    // timeSlotItem.map((item,i) => fireEvent.click(item));

    fireEvent.click(timeSlotItem[0]);

    expect(handleClick).toHaveBeenCalled();
  });

  it('a modal should open after clicked and there should be an input field to add the reason for the call', async () => {
    const timeSlotItem = await screen.findAllByRole('button');

    fireEvent.click(timeSlotItem[0]);

    const modal = await screen.findByRole('dialog');

    expect(modal).toBeInTheDocument();

    const input = await screen.findByRole('textbox');

    expect(input).toBeInTheDocument();
  });

  it('cannot select a slot that has already been picked', async () => {
    const slot = screen.getByTestId(/slot-/i);
    fireEvent.click(slot);
    selectSlot(slot);

    expect(selectedSlots).toHaveLength(1);
    fireEvent.click(slot);
    expect(selectedSlots).toHaveLength(1);
  });
});
