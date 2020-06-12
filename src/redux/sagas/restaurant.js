import { takeLatest } from "redux-saga/effects";
import {
  GET_RESTAURANTS,
  CREATE_RESTAURANT,
  UPDATE_RESTAURANT,
  DELETE_RESTAURANT
} from "redux/constants";
import apiCall from "utils/apiCall";

const getRestaurants = apiCall({
  type: GET_RESTAURANTS,
  method: "get",
  path: "/restaurants/"
});

const postRestaurant = apiCall({
  type: CREATE_RESTAURANT,
  method: "post",
  path: "/restaurants/"
});

const putRestaurant = apiCall({
  type: UPDATE_RESTAURANT,
  method: "put",
  path: ({ id }) => `/restaurants/${id}/`
});

const deleteRestaurant = apiCall({
  type: DELETE_RESTAURANT,
  method: "delete",
  path: ({ id }) => `/restaurants/${id}/`
});

export default function* rootSaga() {
  yield takeLatest(GET_RESTAURANTS, getRestaurants);
  yield takeLatest(CREATE_RESTAURANT, postRestaurant);
  yield takeLatest(DELETE_RESTAURANT, deleteRestaurant);
  yield takeLatest(UPDATE_RESTAURANT, putRestaurant);
}
