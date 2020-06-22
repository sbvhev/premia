import { handleActions } from "redux-actions";
import { Success, Fail } from "utils/status";
import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  SET_USER_PARAMS
} from "redux/constants";

const initialState = {
  users: [],
  user: null,
  count: 0,
  loading: true,
  params: {
    page: 1,
    limit: 5,
    role: ""
  },
  error: ""
};

export default handleActions(
  {
    [SET_USER_PARAMS]: (state, { payload }) => ({
      ...state,
      loading: true,
      params: {
        ...state.params,
        ...payload
      }
    }),
    [Success(GET_USERS)]: (state, { payload }) => ({
      ...state,
      loading: false,
      users: payload.users,
      count: payload.count,
      error: null
    }),
    [Fail(GET_USERS)]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload.data
    }),
    [Success(CREATE_USER)]: (state, { payload }) => ({
      ...state,
      loading: false,
      user: payload,
      count: state.count + 1,
      error: null
    }),
    [Fail(CREATE_USER)]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload.data,
        user: null
      };
    },
    [Success(UPDATE_USER)]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        user: payload,
        error: null
      };
    },
    [Fail(UPDATE_USER)]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload.data
      };
    },
    [Success(DELETE_USER)]: state => {
      return {
        ...state,
        loading: false,
        count: state.count - 1,
        error: null
      };
    },
    [Fail(DELETE_USER)]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: payload.data
      };
    }
  },
  initialState
);
