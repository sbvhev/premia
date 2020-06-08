import { createAction } from "redux-actions";
import { LOG_IN, SIGN_UP } from "redux/constants";

export const login = createAction(LOG_IN);
export const signup = createAction(SIGN_UP);

export default {
  login,
  signup
};
