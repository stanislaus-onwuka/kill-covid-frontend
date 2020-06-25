import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import doctorReducer from './doctor/doctor.reducer';

export default combineReducers({
  user: userReducer,
  doctor: doctorReducer
});