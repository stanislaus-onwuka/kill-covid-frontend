import doctorActionTypes from "./doctor.types";

const INITIAL_STATE = {
  currentDoctorId: null
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
    default: 
      return state;
  }
};

export default doctorReducer;