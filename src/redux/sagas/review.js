import { takeLatest } from "redux-saga/effects";
import { GET_REVIEWS } from "redux/constants";
import apiCall from "utils/apiCall";

const getReviews = apiCall({
  type: GET_REVIEWS,
  method: "get",
  path: ({ id }) => `/restaurants/${id}/reviews`
});

export default function* rootSaga() {
  yield takeLatest(GET_REVIEWS, getReviews);
}
