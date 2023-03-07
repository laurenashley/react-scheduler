/** Returns array of appointment objects from state for a given day */
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

/** Returns new interview object with interviewer object */
/** Takes in interview object, uses interviewer id to look up full interviewer object  */
export function getInterview(state, interview) {
  return (interview !== null)
          ? {
              "student": interview.student,
              "interviewer": state.interviewers[interview.interviewer]
            }
          : null;
}

/** Returns array of interviewer objects from state for a given day */
export function getInterviewersForDay(state, day) {
  const dayData = state.days.find(thisDay => thisDay.name === day);
  const interviewersArray = [];

  if (dayData) {
    for (const intvrID of dayData.interviewers) {
      const interviewerObj = state.interviewers[intvrID];
      interviewersArray.push(interviewerObj);
    }
  }

  return interviewersArray;
}