import { globalVariablesObj } from "./index.js";

export function finedLastIndexAndItem() {
  globalVariablesObj.lastIndexOfActionsArray =
    globalVariablesObj.actionsArray.length - 1;
  globalVariablesObj.lastItemOfActionsArray =
    globalVariablesObj.actionsArray[globalVariablesObj.lastIndexOfActionsArray];
}