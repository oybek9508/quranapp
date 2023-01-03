import { isEqual } from "lodash";

export const areArraysEqual = (array1, array2) =>
  isEqual([...array1].sort(), [...array2].sort());
