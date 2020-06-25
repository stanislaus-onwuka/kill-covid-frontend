import doctorActionTypes from './doctor.types'

export const setCurrentDoctor = doctor => ({
  type: doctorActionTypes.SET_CURRENT_DOCTOR,
  payload: doctor
});
