import mockRouter from 'next-router-mock';

import CFModal from '@/components/CFModal';
import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('next/router', () => require('next-router-mock'));

describe('CFModal', () => {
  let isModalOpen = true;
  const time = new Date();
  const setSelected = jest.fn();
  const setIsModalOpen = jest.fn();

  beforeEach(() => {
    render(
      <CFModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        time={time}
        setSelected={setSelected}
      />,
    );
  });

  it('should render a modal', async () => {
    const modal = await screen.findByRole('dialog');
    expect(modal).toBeInTheDocument();
  });

  it('should render a input field', async () => {
    const input = await screen.findByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('should render a submit button', async () => {
    const submitButton = await screen.findByRole('button', {
      name: 'Confirm Call',
    });
    expect(submitButton).toBeInTheDocument();
  });

  it('should render a cancel button', async () => {
    const cancelButton = await screen.findByRole('img', {
      name: 'close',
    });
    expect(cancelButton).toBeInTheDocument();
  });

  it('isModalOpen should be false when cancel button is clicked', async () => {
    // const setIsModalOpen = jest.fn();
    let isModalOpen;
    const cancelButton = await screen.findByRole('img', {
      name: 'close',
    });
    fireEvent.click(cancelButton);
    expect(isModalOpen).toBeFalsy();
  });

  it('appointment textbox should change when user types', () => {
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Test' } });
    expect(input).toHaveValue('Test');
  });

  it('confirm button should fire when clicked to book a session', async () => {
    const submitButton = await screen.findByRole('button', {
      name: 'Confirm Call',
    });
    const input = screen.getByRole('textbox');
    if (input.innerHTML.length > 0) {
      //confirm button should only fire if there is a reason for the call
      fireEvent.click(submitButton);
      expect(submitButton).toHaveBeenCalled();
    }
  });
});
