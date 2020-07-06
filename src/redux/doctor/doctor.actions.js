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