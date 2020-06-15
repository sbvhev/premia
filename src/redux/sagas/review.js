import { takeLatest } from "redux-saga/effects";
import {
  GET_REVIEWS,
  ADD_REVIEW,
  EDIT_REVIEW,
  DELETE_REVIEW
} from "redux/constants";
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

const editReview = apiCall({
  type: EDIT_REVIEW,
  method: "put",
  path: ({ id }) => `/restaurants/reviews/${id}`
});

const deleteReview = apiCall({
  type: DELETE_REVIEW,
  method: "delete",
  path: ({ id }) => `/restaurants/reviews/${id}`
});

export default function* rootSaga() {
  yield takeLatest(GET_REVIEWS, getReviews);
  yield takeLatest(ADD_REVIEW, addReview);
  yield takeLatest(EDIT_REVIEW, editReview);
  yield takeLatest(DELETE_REVIEW, deleteReview);
}
