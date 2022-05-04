import { Reducer } from "redux";
import { GraphActionTypes, GraphState } from "./types";

export const initialState: GraphState = {
  input: undefined,
  output: undefined,
};

const GraphReducer: Reducer<GraphState> = (state = initialState, action) => {
  switch (action.type) {
    case GraphActionTypes.SET_INPUTS: {
      return { ...state, input: action.payload };
    }
    case GraphActionTypes.SET_OUTPUTS: {
      return { ...state, output: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default GraphReducer;
