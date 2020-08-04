import doctorActionTypes from './doctor.types'

export const setCurrentDoctor = doctor => ({
  type: doctorActionTypes.SET_CURRENT_DOCTOR_ID,
  payload: doctor
});

export const setDoctorPatients = patients => ({
  type: doctorActionTypes.SET_DOCTOR_PATIENTS,
  payload: patients
});

export const setCurrentPatient = patient => ({
  type: doctorActionTypes.SET_CURRENT_PATIENT,
  payload: patient
});

export const logDoctorIn = tokens => ({
  type: doctorActionTypes.LOG_DOCTOR_IN,
  payload: tokens
});

export const setDoctorAccessToken = accessToken => ({
  type: doctorActionTypes.SET_DOCTOR_ACCESS_TOKEN,
  payload: accessToken
});

export const setDoctorRefreshToken = refreshToken => ({
  type: doctorActionTypes.SET_DOCTOR_REFRESH_TOKEN,
  payload: refreshToken
});