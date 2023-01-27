import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';
import mockRouter from 'next-router-mock';

import { useReducer } from 'react';

jest.mock('next/router', () => require('next-router-mock'));

describe('Home', () => {
  it('renders a heading', () => {
    // mockRouter.push('/');

    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: 'CF Calendar',
    });

    expect(heading).toBeInTheDocument();
  });
});
