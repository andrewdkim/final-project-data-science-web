import { Point } from "../types";
const json = require("../uncountable_data.json")

export type typeOfData = "inputs" | "outputs";

interface KVP {
  key: string;
  value: string;
}

interface CacheGraph {
  [key: string]: Point[];
}

interface CacheTable {
  [key: string]: KVP[];
}

interface AnnotatedKVPTable {
  name: string;
  inputs: KVP[];
  outputs: KVP[];
}

export namespace UncountableData {
  const inputKeys: Set<string> = new Set();
  const outputKeys: Set<string> = new Set();
  const cachedGraph: CacheGraph = {};
  const cachedTable: CacheTable = {};

  export const parseData = () => {
    Object.keys(json).forEach((name) => {
      const entry = json[name];
      if (entry.inputs && entry.outputs) {
        const inputKVP: KVP[] = [];
        const outputKVP: KVP[] = [];
        const inputKVPKey = name + "inputs";
        const outputKVPKey = name + "outputs";
        for (const key in entry.inputs) {
          inputKeys.add(key);
          inputKVP.push({
            key,
            value: entry.inputs[key],
          });
        }
        for (const key in entry.outputs) {
          outputKeys.add(key);
          outputKVP.push({
            key,
            value: entry.outputs[key],
          });
        }
        cachedTable[inputKVPKey] = inputKVP;
        cachedTable[outputKVPKey] = outputKVP;
      }
    });
  };

  export const getKVPData = (key: string, type: typeOfData) => {
    const KVPKey = key + type;
    return cachedTable[KVPKey];
  };

  export const getAnnotatedKVPData = () => {
    const data: AnnotatedKVPTable[] = [];
    Object.keys(json).forEach((name) => {
      const inputsKey = name + "inputs";
      const outputsKey = name + "outputs";
      data.push({
        name,
        inputs: cachedTable[inputsKey],
        outputs: cachedTable[outputsKey],
      });
    });
    return data;
  };

  export const getSelections = (type: typeOfData) => {
    if (type === "inputs") {
      return inputKeys;
    }
    return outputKeys;
  };

  export const getInputOutputPoints = (inputKey: string, outputKey: string) => {
    if (cachedGraph[inputKey + outputKey]) {
      return cachedGraph[inputKey + outputKey];
    }
    const points: Point[] = [];
    Object.keys(json).forEach((val) => {
      const entry = json[val];
      if (
        entry.inputs &&
        entry.outputs &&
        entry.inputs[inputKey] &&
        entry.outputs[outputKey]
      ) {
        points.push({
          x: entry.inputs[inputKey],
          y: entry.outputs[outputKey],
        });
      }
    });
    cachedGraph[inputKey + outputKey] = points;
    return points;
  };
}
