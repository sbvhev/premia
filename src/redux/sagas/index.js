import { all } from "redux-saga/effects";
import auth from "./auth";
import restaurant from "./restaurant";

export default function* rootSaga() {
  yield all([auth(), restaurant()]);
}
