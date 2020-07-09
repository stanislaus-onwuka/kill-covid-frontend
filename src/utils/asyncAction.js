import { SIGN_OUT } from "../redux/actions/types";

const asyncAction = (type, request) => (...args) => async (dispatch) => {
  dispatch({
    type: `${type}_REQUESTED`,
    request: { ...args },
  });

  try {
    const payload = await request(...args);
    if (payload.error) {
      if (payload.message.toLowerCase().includes("token")) {
        dispatch({
          type: SIGN_OUT,
          request: { ...args },
          errors: [payload.message],
        });
        return Promise.resolve();
      }
      dispatch({
        type: `${type}_FAILED`,
        request: { ...args },
        errors: [payload.message],
      });
      return Promise.resolve();
    }
    dispatch({
      type: `${type}_SUCCEEDED`,
      request: { ...args },
      payload,
    });
  } catch (error) {
    dispatch({
      type: `${type}_FAILED`,
      request: { ...args },
      errors: ["Something bad happened somewhere"],
    });
  }
  return Promise.resolve();
};

export default asyncAction;
