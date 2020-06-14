import { createAction } from "redux-actions";
import { GET_REVIEWS, SET_PARAMS } from "redux/constants";

export const getReviews = createAction(GET_REVIEWS);
export const setParams = createAction(SET_PARAMS);

export default {
  getReviews,
  setParams
};
