export function getAppointmentsForDay(state, day) {
  const dayData = state.days.find(thisDay => thisDay.name === day);
  const appointmentsArray = [];

  if (dayData) {
    for (const appointment of dayData.appointments) {
      appointmentsArray.push(state.appointments[appointment]);
    }
  }

  return appointmentsArray;
}

export function getInterview(state, interview) {
  return (interview !== null)
          ? {
              "student": interview.student,
              "interviewer": state.interviewers[interview.interviewer]
            }
          : null;
}

export function getInterviewersForDay(state, day) {
  const dayData = state.days.find(thisDay => thisDay.name === day);
  const interviewersArray = [];

  console.log('dayData: ', state.appointments, dayData);

  if (dayData) {
    for (const interviewer of dayData.interviewers) {
      console.log('interviewer: ', interviewer);
      interviewersArray.push(state.interviewers[interviewer]);
    }
  }

  console.log('interviewersArray: ', interviewersArray);

  return interviewersArray;
}