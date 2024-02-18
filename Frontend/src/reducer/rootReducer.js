import searchReducer from "./searchReducer";
import userDetailsReducer from "./userDetailsReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    search: searchReducer,
    user: userDetailsReducer,
  });


export default rootReducer;