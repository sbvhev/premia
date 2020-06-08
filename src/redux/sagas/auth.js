import { takeLatest } from "redux-saga/effects";
import { LOG_IN } from "redux/constants";
import apiCall from "utils/apiCall";

const login = apiCall({
  type: LOG_IN,
  method: "post",
  path: () => "/auth/login/",
  success: ({ data }) => {
    localStorage.setItem("auth_token", JSON.stringify(data));
  }
});

export default function* rootSaga() {
  yield takeLatest(LOG_IN, login);
}
