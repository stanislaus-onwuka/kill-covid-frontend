import { createStore, applyMiddleware, compose } from 'redux';
// import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer';

let middlewares = [thunkMiddleware, logger]

if(process.env.NODE_ENV==='production'){
  middlewares = [thunkMiddleware]
}

// export const store =  createStore(rootReducer,applyMiddleware(...middlewares));

/*
  needed for redux dev tools browser extension to work
  please do not delete, dev tools keep developers sane
*/
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(...middlewares),
));



export const persistor = persistStore(store);

export default store;
