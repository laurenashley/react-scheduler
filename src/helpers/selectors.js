export function getAppointmentsForDay(state, day) {
  const dayData = state.days.find(thisDay => thisDay.name === day);
  console.log('dayDta::::::: ', dayData.appointments);
  const appointments = [];

  for (const appointment in dayData.appointments) {
    console.log('thisAppntment:::: ', appointment)
    // iterate over state.appointments, adding dayData's appnt to appoitntments array
    appointments.push(appointment);
  }

  return appointments;
}