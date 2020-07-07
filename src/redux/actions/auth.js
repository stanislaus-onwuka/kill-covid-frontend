import { signInWithGoogle } from "../../firebase";
// import asyncAction from "../../utils/asyncAction";
import * as actionTypes from "../actions/types";

export const authWithGoogle = (dispatch) => () => {
  dispatch({ type: actionTypes.AUTH_WITH_GOOGLE_REQUESTED });
  signInWithGoogle()
    .then((data) => {
      // This action shold be SIGN_UP_WITH... or SIGN_IN_WITH...
      // depending on if it's first signup or not
      dispatch({ type: actionTypes.AUTH_WITH_GOOGLE_SUCCESSFUL });
    })
    .catch(() => {
      dispatch({ type: actionTypes.AUTH_WITH_GOOGLE_FAILED });
    });
};
