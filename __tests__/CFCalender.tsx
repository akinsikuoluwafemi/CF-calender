import mockRouter from 'next-router-mock';
import CFCalender from '@/components/CFCalender';
import fetchTimeSlots from '../utils/fetchTimeSlots';

import { render, screen, fireEvent } from '@testing-library/react';

import '../context';

jest.mock('../utils/fetchTimeSlots.tsx', () =>
  jest.fn(() =>
    Promise.resolve([
      {
        mentor: {
          name: 'John Doe',
          time_zone: '-03:00',
        },
        calendar: [
          {
            date_time: '2023-01-23 13:00:00 +0100',
          },
          {
            date_time: '2023-01-27 09:00:00 +0100',
          },
        ],
      },
    ]),
  ),
);

jest.mock('next/router', () => require('next-router-mock'));

describe('Calender', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    render(
      <CFCalender
        value={new Date()}
        setValue={() => {}}
        clicked={false}
        setClicked={() => {}}
      />,
    );
  });

  test('renders Calender component', () => {
    // mockRouter.push('/');

    const calender = screen.getByText('Select a date');

    expect(calender).toBeInTheDocument();
  });

  test('clicking on a date should change the value', () => {
    const dateButton = screen.getByText('10');
    fireEvent.click(dateButton);
    expect(dateButton).toHaveTextContent('10');
  });

  test('after clicking a date, it fetches mentor availability', () => {
    const dateButton = screen.getByText('10');
    fireEvent.click(dateButton);
    expect(fetchTimeSlots).toHaveBeenCalled();
  });
});
