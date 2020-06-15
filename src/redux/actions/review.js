import { createAction } from "redux-actions";
import {
  GET_REVIEWS,
  SET_REVIEW_PARAMS,
  ADD_REVIEW,
  EDIT_REVIEW,
  DELETE_REVIEW
} from "redux/constants";

export const getReviews = createAction(GET_REVIEWS);
export const addReview = createAction(ADD_REVIEW);
export const editReview = createAction(EDIT_REVIEW);
export const deleteReview = createAction(DELETE_REVIEW);
export const setParams = createAction(SET_REVIEW_PARAMS);

export default {
  getReviews,
  addReview,
  editReview,
  deleteReview,
  setParams
};
