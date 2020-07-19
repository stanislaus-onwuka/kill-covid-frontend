import userActionTypes from "./user.types";
import * as actionTypes from "../actions/types";

const INITIAL_STATE = {
  currentUser: null,
  authenticating: false,
  accessToken: null
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
    case actionTypes.AUTH_WITH_SOCIAL_REQUESTED:
      return {
        ...state,
        authenticating: true,
      };
    case actionTypes.SIGNED_IN_WITH_SOCIAL:
      return {
        ...state,
        currentUser: action.payload,
        authenticating: false,
      };
    case actionTypes.SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload
      };
    case actionTypes.SIGNED_UP_WITH_SOCIAL:
      return {
        ...state,
        currentUser: action.payload,
        authenticating: false,
      };
    case actionTypes.AUTH_WITH_SOCIAL_FAILED:
      return {
        ...state,
        authenticating: false,
      };
    case userActionTypes.ADD_PHONE_NUMBER:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          phoneNumber: action.payload
        }
      }
    case userActionTypes.UPDATE_IMAGE_URL:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          imageUrl: action.payload
        }
      }
    default:
      return state;
  }
};

export default userReducer;
