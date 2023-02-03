import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const dailyAppointments = [];

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments')
    ])
      .then(all => {
        console.log(all[0]);
        console.log(all[1]);
        setState(prev => ({...prev, days: all[0], appointments: all[1]}));
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
        {
          dailyAppointments.map(appointment => (
            <>
              <Appointment 
                key={appointment.id}
                {...appointment}
              />
              <Appointment key="last" time="5pm" />
            </>
          ))
        }
      </section>
    </main>
  );
}
