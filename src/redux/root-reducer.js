import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer';
import doctorReducer from './doctor/doctor.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user','doctor']
}

const rootReducer = combineReducers({
  user: userReducer,
  doctor: doctorReducer
});

export default persistReducer(persistConfig, rootReducer)