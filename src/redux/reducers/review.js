import { handleActions } from "redux-actions";
import { Success, Fail } from "utils/status";
import { GET_REVIEWS, SET_PARAMS } from "redux/constants";

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
    [SET_PARAMS]: (state, { payload }) => ({
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
    })
  },
  initialState
);
