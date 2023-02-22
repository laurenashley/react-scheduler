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

  if (dayData) {
    for (const intvrID of dayData.interviewers) {
      const interviewerObj = state.interviewers[intvrID];
      
      interviewersArray.push(interviewerObj);
    }
  }

  // console.log('getinterviewersbyday: ', interviewersArray);
  return interviewersArray;
}