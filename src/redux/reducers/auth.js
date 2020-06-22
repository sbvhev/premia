import { handleActions } from "redux-actions";
import { Success, Fail } from "utils/status";
import {
  LOG_IN,
  SIGN_UP,
  LOG_OUT,
  UPDATE_PROFILE,
  REMOVE_PROFILE
} from "redux/constants";

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
    }),
    [Success(SIGN_UP)]: state => ({
      ...state,
      status: "SUCCESS",
      error: null
    }),

    [Fail(SIGN_UP)]: (state, { payload }) => ({
      ...state,
      token: null,
      status: "FAIL",
      me: null,
      error: payload
    }),
    [Success(UPDATE_PROFILE)]: (state, { payload }) => ({
      ...state,
      status: "SUCCESS",
      error: null,
      me: payload.info
    }),

    [Fail(UPDATE_PROFILE)]: (state, { payload }) => ({
      ...state,
      status: "FAIL",
      error: payload
    }),
    [Success(REMOVE_PROFILE)]: (state, { payload }) => ({
      ...state,
      status: "SUCCESS",
      error: null,
      me: {}
    }),

    [Fail(REMOVE_PROFILE)]: (state, { payload }) => ({
      ...state,
      status: "FAIL",
      error: payload,
      me: {}
    }),
    [LOG_OUT]: state => ({
      ...state,
      token: null,
      status: LOG_OUT,
      me: null,
      error: null
    })
  },
  getInitialState()
);
