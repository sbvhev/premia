import { createAction } from "redux-actions";
import { LOG_IN } from "redux/constants";

export const login = createAction(LOG_IN);

export default {
  login
};
