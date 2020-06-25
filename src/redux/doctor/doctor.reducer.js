import doctorActionTypes from "./doctor.types";

const INITIAL_STATE = {
  currentDoctor: null
}

const doctorReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case doctorActionTypes.SET_CURRENT_DOCTOR:
      return {
        ...state,
        currentDoctor: action.payload
      }
    default: 
      return state;
  }
};

export default doctorReducer;