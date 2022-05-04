import { combineReducers } from "redux";
import GraphReducer from "./graph/reducer";

import { GraphState } from "./graph/types";

export interface AppState {
  graph: GraphState;
}

const rootReducer = combineReducers({
  graph: GraphReducer,
});
export default rootReducer;
