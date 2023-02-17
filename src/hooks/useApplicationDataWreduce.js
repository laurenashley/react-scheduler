import { useReducer, useEffect, setState } from "react";
import axios, { Axios } from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, action.day }
      case SET_APPLICATION_DATA:
        return {...prev, 
          days: action.all[0].data, 
          appointments: action.all[1].data,
          interviewers: action.all[2].data
        }
      case SET_INTERVIEW:
        return { /* insert logic */
        
        }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, setState] = useReducer({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => dispatch({ ...state, day });

  const packageState = (id, value) => {
    const appointment = {
      ...state.appointments[id],
      interview: value ? { ...value } : null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    /**
     * Days
     */
    const day = state.days.find(day => day.name === state.day);
    let spotsCount = 0;
    
    for (const apptID of day.appointments) {
      if (appointments[apptID].interview === null) {
        spotsCount++;
      }
    }

    const dayState = {
      ...state.days[day.id],
      spots: spotsCount
    };
    const days = [ ...state.days ];
    days[day.id] = dayState;
    console.log('new Days state: ', days);

    return [ appointment, appointments, days ];
  };

  function bookInterview(id, interview) {
    const [ appointment, appointments, days ] = packageState(id, interview);

    return (
      axios.put(`/api/appointments/${id}`, appointment)
        .then((res) => {
          console.log('res.body: ', res);
          setState({ ...state, appointments, days });
        })
    );
  }

  function cancelInterview(id) {
    const [ appointment, appointments, days ] = packageState(id);

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
        dispatchEvent({ type: SET_APPLICATION_DATA, all})
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