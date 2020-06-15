import { takeLatest } from "redux-saga/effects";
import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER
} from "redux/constants";
import apiCall from "utils/apiCall";

const getUsers = apiCall({
  type: GET_USERS,
  method: "get",
  path: "/users/"
});

const createUser = apiCall({
  type: CREATE_USER,
  method: "post",
  path: "/users/"
});

const updateUser = apiCall({
  type: UPDATE_USER,
  method: "put",
  path: ({ id }) => `/users/${id}/`
});

const deleteUser = apiCall({
  type: DELETE_USER,
  method: "delete",
  path: ({ id }) => `/users/${id}/`
});

export default function* rootSaga() {
  yield takeLatest(GET_USERS, getUsers);
  yield takeLatest(CREATE_USER, createUser);
  yield takeLatest(DELETE_USER, deleteUser);
  yield takeLatest(UPDATE_USER, updateUser);
}
