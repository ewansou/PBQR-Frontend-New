import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middleware = [thunk];

const store = createStore(
  rootReducer, //combineReducers == auth and message reducers
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;