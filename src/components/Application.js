import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

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

    const updateAPI = (id, appointment) => { // Needs appointments too
      axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        // console.log('res.body: ', res);
        setState({ ...state, appointments });
      });
    };

    function bookInterview(id, interview) {
      const [ appointment, appointments ] = packAppointments(id, interview);

      setState({ ...state, appointments });

      updateAPI(id, appointment, appointments);
    }

    function cancelInterview(id) {
      const [ appointment, appointments ] = packAppointments(id);

      setState({ ...state, appointments });

      updateAPI(id, appointment, appointments);
    }
  
    // console.log('appntmnt state.ints: ', appointment);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={getInterviewersForDay(state, state.day)}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

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

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          onChange={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        { schedule }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
