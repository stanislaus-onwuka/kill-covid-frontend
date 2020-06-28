import doctorActionTypes from "./doctor.types";

const INITIAL_STATE = {
  currentDoctor: null
}

const doctorReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case doctorActionTypes.SET_CURRENT_DOCTOR_ID:
      return {
        ...state,
        currentDoctorId: action.payload
      }
    default: 
      return state;
  }
};

export default doctorReducer;