import { useState, useEffect, setState } from "react";
import axios, { Axios } from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

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

  function bookInterview(id, interview) {
    const [ appointment, appointments ] = packAppointments(id, interview);

    setState({ ...state, appointments });

    return (
      axios.put(`/api/appointments/${id}`, appointment)
        .then((res) => {
          console.log('res.body: ', res);
          setState({ ...state, appointments });
        })
    );
  }

  function cancelInterview(id) {
    const [ appointment, appointments ] = packAppointments(id);

    setState({ ...state, appointments });

    return (
      axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        console.log('res.body: ', res);
        setState({ ...state, appointments });
      })
      .catch(err => console.log(err))
    );
  }

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then(all => {
        console.log(all[0]);
        console.log(all[1]);
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