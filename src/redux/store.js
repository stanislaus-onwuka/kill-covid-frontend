import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import rootReducer from './root-reducer';

let middlewares = [logger]

if(process.env.NODE_ENV==='production'){
  middlewares = []
}

const store =  createStore(rootReducer,applyMiddleware(...middlewares));

export default store;