import { takeLatest } from "redux-saga/effects";
import { LOG_IN, SIGN_UP } from "redux/constants";
import apiCall from "utils/apiCall";

const login = apiCall({
  type: LOG_IN,
  method: "post",
  path: () => "/auth/login/",
  success: ({ data }) => {
    localStorage.setItem("auth_token", JSON.stringify(data));
  }
});

const signup = apiCall({
  type: SIGN_UP,
  method: "post",
  path: () => "/auth/signup/",
  success: () => {
    localStorage.removeItem("auth_token");
  }
});

export default function* rootSaga() {
  yield takeLatest(LOG_IN, login);
  yield takeLatest(SIGN_UP, signup);
}
