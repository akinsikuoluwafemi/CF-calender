# CF Calender App

A simple calendar app that allows students to fetch their mentors availability from an API and select a time slot from the available time.

[Link to App](https://cf-calender.vercel.app/)

## Features

- Fetch mentors availability from an API
- Display the calendar with the available time slots
- Allow the user to select a time slot
- Prevent the user from selecting the same time slot again
- Display an error message when there's an error
- Accessible for screen readers and other accessibility tools
- Responsive design

## Tech stack

- React
- Typescript
- Next.js
- ESlint
- Jest
  React Testing library
- Prettier

## Installation

1: Clone the repository

```bash
git clone git@github.com:akinsikuoluwafemi/CF-calender.git
```

2: Instal dependencies

```bash
yarn or npm install
```

3: Start the development server

```bash
yarn dev or npm run dev
```

4: Testing

```bash
yarn test
```

5: Linting

```bash
yarn lint or npm run lint
```

6: Building

```bash
yarn build or npm run build
```

## Design Decisions

1: This is how my global state looks like

    export interface State {
      loading: boolean;
      error: string;
      clickedDate: string;
      timeSlots: TimeSlots[];
      selectedTimeSlot: pickedSlot;
      showSubmissionAlert: boolean;
      allAppointments: pickedSlot[];
    }

2: Each picked time slot will have this shape

    export interface pickedSlot {
      date_time: Date | string;
      date: string;
      time: string;
      appointmentNotes: string;
    }

3: Each time slot returned from the api will be in this form

    export interface TimeSlots {
      date_time: Date;
    }

4: I am using context and useReducer for this app, so I am wrapping my root with a provider, so I have a global state as the single source of truth, dispatching reducers on the fly to make changes.

5: This is how my ActionTypes files looks like, this are all the types my app uses.

    const PICK_DATE = 'PICK_DATE';
    const FETCH_TIME_SLOTS = 'FETCH_TIME_SLOTS';
    const SET_LOADING = 'SET_LOADING';
    const SET_ERROR = 'SET_ERROR';
    const SET_SELECTED_TIME_SLOT = 'SET_SELECTED_TIME_SLOT';
    const SET_APPOINTMENT_NOTE = 'SET_APPOINTMENT_NOTE';
    const SHOW_ALERT = 'SHOW_ALERT';
    const ADD_APPOINTMENT = 'ADD_APPOINTMENT';
    export {
      PICK_DATE,
      FETCH_TIME_SLOTS,
      SET_LOADING,
      SET_ERROR,
      SET_SELECTED_TIME_SLOT,
      SET_APPOINTMENT_NOTE,
      SHOW_ALERT,
      ADD_APPOINTMENT,
    };
    export * as ActionTypes from './ActionTypes';

6: I am also using local storage for this app, so I can save all the appointments the user has selected before.

7: I also wrote a few robust test cases that mocks the way the user uses the app.

8: I am also using styled components for styling.

# Thank You
