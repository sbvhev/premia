import { createAction } from "redux-actions";
import {
  UPDATE_RESTAURANT,
  CREATE_RESTAURANT,
  GET_RESTAURANTS,
  DELETE_RESTAURANT,
  SET_RESTAURANT_PARAMS
} from "redux/constants";

export const getRestaurants = createAction(GET_RESTAURANTS);
export const updateRestaurant = createAction(UPDATE_RESTAURANT);
export const createRestaurant = createAction(CREATE_RESTAURANT);
export const deleteRestaurant = createAction(DELETE_RESTAURANT);
export const setParams = createAction(SET_RESTAURANT_PARAMS);

export default {
  getRestaurants,
  updateRestaurant,
  createRestaurant,
  deleteRestaurant,
  setParams
};
