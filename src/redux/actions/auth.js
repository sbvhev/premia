import { createAction } from "redux-actions";
import {
  LOG_IN,
  SIGN_UP,
  LOG_OUT,
  UPDATE_PROFILE,
  REMOVE_PROFILE
} from "redux/constants";

export const login = createAction(LOG_IN);
export const signup = createAction(SIGN_UP);
export const updateProfile = createAction(UPDATE_PROFILE);
export const removeProfile = createAction(REMOVE_PROFILE);
export const logout = createAction(LOG_OUT, () => {
  localStorage.removeItem("auth_token");
});

export default {
  login,
  signup,
  logout,
  updateProfile,
  removeProfile
};
