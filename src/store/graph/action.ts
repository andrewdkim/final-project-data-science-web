import { GraphActionTypes } from "./types";

export const setInput = (input: string | undefined) => ({
  type: GraphActionTypes.SET_INPUTS,
  payload: input,
});

export const setOutput = (output: string | undefined) => ({
  type: GraphActionTypes.SET_OUTPUTS,
  payload: output,
});
