import { combineReducers } from "redux";

import auth from "./auth";
import toast from "./toast";
import progress from "./progress";
import restaurant from "./restaurant";

const appReducer = combineReducers({
  auth,
  toast,
  progress,
  restaurant
});

const rootReducer = (state, action) => {
  if (action.type === "LOG_OUT") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
