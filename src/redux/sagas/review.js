import { takeLatest } from "redux-saga/effects";
import { GET_REVIEWS, ADD_REVIEW } from "redux/constants";
import apiCall from "utils/apiCall";

const getReviews = apiCall({
  type: GET_REVIEWS,
  method: "get",
  path: ({ id }) => `/restaurants/${id}/reviews`
});

const addReview = apiCall({
  type: ADD_REVIEW,
  method: "post",
  path: "/restaurants/reviews"
});

export default function* rootSaga() {
  yield takeLatest(GET_REVIEWS, getReviews);
  yield takeLatest(ADD_REVIEW, addReview);
}
