import { combineReducers } from "redux";

import auth from "./auth";
import toast from "./toast";
import progress from "./progress";

const appReducer = combineReducers({
  auth,
  toast,
  progress
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
