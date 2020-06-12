import { createAction } from "redux-actions";
import { LOG_IN, SIGN_UP, LOG_OUT } from "redux/constants";

export const login = createAction(LOG_IN);
export const signup = createAction(SIGN_UP);
export const logout = createAction(LOG_OUT, () => {
  localStorage.removeItem("auth_token");
});

export default {
  login,
  signup,
  logout
};
