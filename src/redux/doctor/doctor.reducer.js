import doctorActionTypes from "./doctor.types";

const INITIAL_STATE = {
  currentDoctorId: null,
  doctorAccessToken: null,
  doctorRefreshToken: null,
  isDoctorAuthenticated: null,
}

const doctorReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case doctorActionTypes.SET_CURRENT_DOCTOR_ID:
      return {
        ...state,
        currentDoctorId: action.payload
      }
    case doctorActionTypes.SET_DOCTOR_PATIENTS:
      return {
        ...state,
        doctorPatients: action.payload
      }
    case doctorActionTypes.SET_CURRENT_PATIENT:
      return {
        ...state,
        currentPatient: action.payload
      }
    case doctorActionTypes.LOG_DOCTOR_IN:
      return {
        ...state,
        doctorAccessToken: action.payload.accessToken,
        doctorRefreshToken: action.payload.refreshToken,
        isDoctorAuthenticated: true
      }
    case doctorActionTypes.SET_DOCTOR_ACCESS_TOKEN:
      return {
        ...state,
        doctorAccessToken: action.payload
      }
    case doctorActionTypes.SET_DOCTOR_REFRESH_TOKEN:
      return {
        ...state,
        doctorRefreshToken: action.payload
      }
    default: 
      return state;
  }
};

export default doctorReducer;