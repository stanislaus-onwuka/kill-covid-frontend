import { signInWithGoogle } from "../../firebase";
// import asyncAction from "../../utils/asyncAction";
import * as actionTypes from "../actions/types";

export const authWithGoogle = (history) => (dispatch) => {
  dispatch({ type: actionTypes.AUTH_WITH_GOOGLE_REQUESTED });
  signInWithGoogle()
    .then((data) => {
      const { user, additionalUserInfo } = data;
      const payload = {
        userId: user.uid,
        profile: user.profile,
        additionalUserInfo,
      };
      dispatch({
        type: actionTypes.SET_ACCESS_TOKEN,
        payload: user._lat
      })
      if (additionalUserInfo.isNewUser) {
        dispatch({
          type: actionTypes.SIGNED_UP_WITH_GOOGLE,
          payload,
        });
        history.push('/Eval');
      } else {
        dispatch({
          type: actionTypes.SIGNED_IN_WITH_GOOGLE,
          payload,
        });
        history.push('/Patient');
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: actionTypes.AUTH_WITH_GOOGLE_FAILED });
    });
};
