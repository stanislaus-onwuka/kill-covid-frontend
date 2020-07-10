import userActionTypes from "./user.types";
import * as actionTypes from "../actions/types";

const INITIAL_STATE = {
  currentUser: null,
  authenticating: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userActionTypes.UPDATE_USER_DETAILS:
      return {
        ...state,
        userUpdate: action.payload,
      };
    case userActionTypes.SET_USER_GUIDES:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          guides: action.payload,
        },
      };
    case actionTypes.AUTH_WITH_GOOGLE_REQUESTED:
      return {
        ...state,
        authenticating: true,
      };
    case actionTypes.SIGNED_IN_WITH_GOOGLE:
      return {
        ...state,
        currentUser: action.payload,
        authenticating: false,
      };
    case actionTypes.SIGNED_UP_WITH_GOOGLE:
      return {
        ...state,
        currentUser: action.payload,
        authenticating: false,
      };
    case actionTypes.AUTH_WITH_GOOGLE_FAILED:
      return {
        ...state,
        authenticating: false,
      };
    default:
      return state;
  }
};

export default userReducer;
