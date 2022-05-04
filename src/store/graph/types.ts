export enum GraphActionTypes {
  SET_INPUTS = "SET_INPUTS",
  SET_OUTPUTS = "SET_OUTPUTS",
}

export interface GraphState {
  readonly input: string | undefined;
  readonly output: string | undefined;
}
