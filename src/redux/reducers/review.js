import { handleActions } from "redux-actions";
import { Success, Fail } from "utils/status";
import {
  GET_REVIEWS,
  SET_REVIEW_PARAMS,
  ADD_REVIEW,
  EDIT_REVIEW
} from "redux/constants";

const initialState = {
  reviews: [],
  currentReview: null,
  filteredResults: [],
  count: 0,
  params: {
    page: 1,
    limit: 5
  },
  error: ""
};

export default handleActions(
  {
    [SET_REVIEW_PARAMS]: (state, { payload }) => ({
      ...state,
      params: {
        ...state.params,
        ...payload
      }
    }),
    [Success(GET_REVIEWS)]: (state, { payload }) => ({
      ...state,
      reviews: payload.reviews,
      count: payload.count,
      error: null
    }),
    [Fail(GET_REVIEWS)]: (state, { payload }) => ({
      ...state,
      error: payload.data
    }),
    [Success(ADD_REVIEW)]: (state, { payload }) => {
      return {
        ...state,
        currentReview: payload,
        count: state.count + 1,
        error: null
      };
    },
    [Fail(ADD_REVIEW)]: (state, { payload }) => {
      return {
        ...state,
        error: payload.data
      };
    },
    [Success(EDIT_REVIEW)]: (state, { payload }) => {
      return {
        ...state,
        currentReview: payload,
        count: state.count,
        error: null
      };
    },
    [Fail(EDIT_REVIEW)]: (state, { payload }) => {
      return {
        ...state,
        error: payload.data
      };
    }
  },
  initialState
);
