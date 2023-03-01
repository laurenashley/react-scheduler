import { useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  const newAppointmenstState = (id, appointment) => {
    /** Copy appointments from state and update with appointment */
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return appointments;
  };

  const countSpots = (day, appointments) => {
    let count = 0;
    
    /** Iterate through appointments, count the ones with null interview */
    for (const apptID of day.appointments) {
      if (appointments[apptID].interview === null) {
        count++;
      }
    }
    return count;
  };

  const newDaysState = (appointments) => {
    const day = state.days.find(day => day.name === state.day);
    const spotsCount = countSpots(day, appointments);

    const dayState = {
      ...state.days[day.id - 1],
      spots: spotsCount
    };
    const days = [ ...state.days ];
    days[day.id - 1] = dayState;

    return days;
  };

  function bookInterview(id, interview) {
    /** Copy appointment from state and add interview to it **/
    const appointment = {
      ...state.appointments[id],
      interview: interview ? { ...interview } : null
    };

    return (
      axios.put(`/api/appointments/${id}`, appointment)
        .then((res) => {
          /** Copy appointments from state and update with appointment */
          const appointments = newAppointmenstState(id, appointment);
          const days = newDaysState(appointments);
          setState({ ...state, appointments, days });
        })
    );
  }

  function cancelInterview(id) {
    /** Copy appointment from state, remove interview **/
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    return (
      axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        /** Copy appointments from state and update with appointment */
        const appointments = newAppointmenstState(id, appointment);
        const days = newDaysState(appointments);
        setState({ ...state, appointments, days });
      })
    );
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then(all => {
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