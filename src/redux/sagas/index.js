import { all } from "redux-saga/effects";
import auth from "./auth";
import restaurant from "./restaurant";
import review from "./review";
import user from "./user";

export default function* rootSaga() {
  yield all([auth(), restaurant(), review(), user()]);
}
