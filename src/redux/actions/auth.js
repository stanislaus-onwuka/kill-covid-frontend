import { signInWithGoogle } from "../../firebase";
// import asyncAction from "../../utils/asyncAction";
import * as actionTypes from "../actions/types";

export const authWithGoogle = (history) => (dispatch) => {
// export const authWithGoogle = (dispatch) => (history) => {
// export const authWithGoogle = (history) => (dispatch) => {
  // console.log("history", history)
  // console.log("something")
  dispatch({ type: actionTypes.AUTH_WITH_GOOGLE_REQUESTED });
  signInWithGoogle()
    .then((data) => {
      const { user, additionalUserInfo } = data;
      const payload = {
        userId: user.uid,
        profile: user.profile,
        additionalUserInfo,
      };
      if (additionalUserInfo.isNewUser) {
        dispatch({
          type: actionTypes.SIGNED_UP_WITH_GOOGLE,
          payload,
        });
      } else {
        dispatch({
          type: actionTypes.SIGNED_IN_WITH_GOOGLE,
          payload,
        });
      }
      history.push('/Login');
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: actionTypes.AUTH_WITH_GOOGLE_FAILED });
    });
};
