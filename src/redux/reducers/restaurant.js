import { handleActions } from "redux-actions";
import { Success, Fail } from "utils/status";
import {
  GET_RESTAURANTS,
  CREATE_RESTAURANT,
  UPDATE_RESTAURANT,
  DELETE_RESTAURANT,
  SET_PARAMS
} from "redux/constants";

const initialState = {
  restaurants: [],
  currentRestaurant: null,
  filteredResults: [],
  count: -1,
  loading: false,
  params: {
    page: 1,
    limit: 5,
    min: null,
    max: null,
    user: []
  },
  error: ""
};

export default handleActions(
  {
    [SET_PARAMS]: (state, { payload }) => ({
      ...state,
      loading: true,
      params: {
        ...state.params,
        ...payload
      }
    }),
    [Success(GET_RESTAURANTS)]: (state, { payload }) => ({
      ...state,
      restaurants: payload.restaurants,
      count: payload.count,
      loading: false,
      error: null
    }),
    [Fail(GET_RESTAURANTS)]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload.data
    }),
    [Success(CREATE_RESTAURANT)]: (state, { payload }) => {
      return {
        ...state,
        currentRestaurant: payload,
        count: state.count + 1,
        loading: false,
        error: null
      };
    },
    [Fail(CREATE_RESTAURANT)]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload.data
      };
    },
    [Success(UPDATE_RESTAURANT)]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        currentRestaurant: payload,
        error: null
      };
    },
    [Fail(UPDATE_RESTAURANT)]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload.data
      };
    },
    [Success(DELETE_RESTAURANT)]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        count: state.count - 1,
        error: null
      };
    },
    [Fail(DELETE_RESTAURANT)]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload.data
      };
    }
  },
  initialState
);
