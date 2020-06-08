import { handleActions } from "redux-actions";
import { Success, Fail } from "utils/status";
import { LOG_IN } from "redux/constants";

const getInitialState = () => {
  let authInfo = JSON.parse(localStorage.getItem("auth_token") || "{}");

  const initialState = {
    status: "",
    error: null,
    me: null,
    token: null
  };

  return authInfo
    ? {
        ...initialState,
        token: authInfo.token,
        me: authInfo.info
      }
    : initialState;
};

export default handleActions(
  {
    [Success(LOG_IN)]: (state, { payload }) => ({
      ...state,
      token: payload.token,
      status: "SUCCESS",
      me: payload.info
    }),

    [Fail(LOG_IN)]: (state, { payload }) => ({
      ...state,
      token: null,
      status: "FAIL",
      me: null,
      error: payload
    })
  },
  getInitialState()
);
