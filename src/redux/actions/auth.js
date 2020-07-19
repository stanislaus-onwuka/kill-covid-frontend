import { signInWithGoogle, signInWithFacebook, signInWithTwitter } from "../../firebase";
// import asyncAction from "../../utils/asyncAction";
import * as actionTypes from "../actions/types";

export const authWithGoogle = (history) => (dispatch) => {
  dispatch({ type: actionTypes.AUTH_WITH_SOCIAL_REQUESTED });
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
          type: actionTypes.SIGNED_UP_WITH_SOCIAL,
          payload,
        });
        history.push('/Eval');
      } else {
        dispatch({
          type: actionTypes.SIGNED_IN_WITH_SOCIAL,
          payload,
        });
        history.push('/Patient');
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: actionTypes.AUTH_WITH_SOCIAL_FAILED });
    });
};

export const authWithFacebook = (history) => (dispatch) => {
  dispatch({ type: actionTypes.AUTH_WITH_SOCIAL_REQUESTED });
  signInWithFacebook()
    .then((data) => {
      const { user, additionalUserInfo } = data;

      //HACK : because facebook, twitter and google return different additionalUserInfo format
      additionalUserInfo.profile.family_name = additionalUserInfo.profile.last_name;
      additionalUserInfo.profile.given_name = additionalUserInfo.profile.first_name;

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
          type: actionTypes.SIGNED_UP_WITH_SOCIAL,
          payload,
        });
        history.push('/Eval');
      } else {
        dispatch({
          type: actionTypes.SIGNED_IN_WITH_SOCIAL,
          payload,
        });
        history.push('/Patient');
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: actionTypes.AUTH_WITH_SOCIAL_FAILED });
    });
};
export const authWithTwitter = (history) => (dispatch) => {
  dispatch({ type: actionTypes.AUTH_WITH_SOCIAL_REQUESTED });
  signInWithTwitter()
    .then((data) => {
      const { user, additionalUserInfo } = data;
      //HACK : because facebook, twitter and google return different additionalUserInfo format
      additionalUserInfo.profile.family_name = additionalUserInfo.profile.name.split(' ')[1];
      additionalUserInfo.profile.given_name = additionalUserInfo.profile.name.split(' ')[0];

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
          type: actionTypes.SIGNED_UP_WITH_SOCIAL,
          payload,
        });
        history.push('/Eval');
      } else {
        dispatch({
          type: actionTypes.SIGNED_IN_WITH_SOCIAL,
          payload,
        });
        history.push('/Patient');
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: actionTypes.AUTH_WITH_SOCIAL_FAILED });
    });
};