import { createAction } from "redux-actions";
import { GET_REVIEWS, SET_REVIEW_PARAMS, ADD_REVIEW } from "redux/constants";

export const getReviews = createAction(GET_REVIEWS);
export const addReview = createAction(ADD_REVIEW);
export const setParams = createAction(SET_REVIEW_PARAMS);

export default {
  getReviews,
  addReview,
  setParams
};
