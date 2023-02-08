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

    function bookInterview(id, interview) {
      console.log('bookIntervw: ', id, interview);
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };

      console.log('bookIntervw appnt id: 1 ', appointment, state.appointments[1]); // interviewer in state is undefined here, good...
      const appointments = {
        ...state.appointments,
        interview: {...state.appointments.interview},
        [id]: appointment
      };
      console.log('bookIntervw appntS id: 1 ', appointments[1]); // interview.interviewer obj is def'd here, good...
      setState({
        ...state,
        appointments
      });
      console.log('state after adding appointment id: 1 ', state.appointments[1]); // problem: interview obj is null here
      // axios PUT request will go here

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
