import { useState, useEffect, setState } from "react";
import axios, { Axios } from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  const packAppointments = (id, value) => {
    const appointment = {
      ...state.appointments[id],
      interview: value ? { ...value } : null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return [ appointment, appointments ];
  };

  const updateSpots = (appointments) => {
    // find day 
    const day = state.days.find(day => day.name === state.day);
    const dayID = day.id - 1;

    // count appointments that have null interview
    const spotsCount = state.days[dayID].appointments.reduce();
    // iterate through state.appointments per state.days.appointments
    // Count app's with null appointment


    const dayState = {
      ...state.days[dayID]
      // spots: cancel ? day.spots + 1 : day.spots - 1
    };
    console.log('dayState: ', dayState);

    const days = [ ...state.days ];
    days[dayID] = dayState;
    console.log('new Days state: ', days);

    return days;
  };

  function bookInterview(id, interview) {
    const [ appointment, appointments ] = packAppointments(id, interview);
    const days = updateSpots(appointments);

    return (
      axios.put(`/api/appointments/${id}`, appointment)
        .then((res) => {
          console.log('res.body: ', res);
          setState({ ...state, appointments, days });
        })
    );
  }

  function cancelInterview(id) {
    const [ appointment, appointments ] = packAppointments(id);
    const days = updateSpots(appointments);

    return (
      axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        console.log('res.body: ', res);
        setState({ ...state, appointments, days });
      })
      .catch(err => console.log(err))
    );
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then(all => {
        console.log('Days Data: ', all[0]);
        console.log('Appointments Data: ', all[1]);
        setState(prev => ({...prev, 
          days: all[0].data, 
          appointments: all[1].data,
          interviewers: all[2].data
        }));
      })
      .catch(err => console.log(err));
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}