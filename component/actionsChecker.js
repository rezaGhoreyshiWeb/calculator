import { showActions } from "./index.js";
import { finedLastIndexAndItem } from "./finedLastIndexAndItem.js";
export function actionsChecker(value, globalVariablesObj) {
  finedLastIndexAndItem(globalVariablesObj);
  globalVariablesObj.removeAction = false;

  // bracket check
  if (value.includes("(")) {
    if (globalVariablesObj.lastItemOfActionsArray === ")") return;
    if (
      globalVariablesObj.bracketRight &&
      globalVariablesObj.lastItemOfActionsArray !== "(" &&
      !isNaN(globalVariablesObj.lastItemOfActionsArray)
    ) {
      globalVariablesObj.actionsArray.push(")");
      globalVariablesObj.bracketRight = false;
      globalVariablesObj.bracketLeft = true;
      showActions(globalVariablesObj);

      return;
    }
    if (globalVariablesObj.bracketLeft) {
      if (
        globalVariablesObj.actionsArray.length === 0 ||
        isNaN(globalVariablesObj.lastItemOfActionsArray)
      ) {
        globalVariablesObj.actionsArray.push("(");
        globalVariablesObj.bracketLeft = false;
        globalVariablesObj.bracketRight = true;
        showActions(globalVariablesObj);
      }
      return;
    }
  }
  // number check
  if (!isNaN(value)) {
    if (
      !isNaN(globalVariablesObj.lastItemOfActionsArray) ||
      globalVariablesObj.lastItemOfActionsArray?.includes(".")
    ) {
      globalVariablesObj.actionsArray[
        globalVariablesObj.lastIndexOfActionsArray
      ] = globalVariablesObj.lastItemOfActionsArray + value;
      showActions(globalVariablesObj);

      return;
    }
    globalVariablesObj.actionsArray.push(value);
    showActions(globalVariablesObj);

    return;
  }
  // decimal check
  if (value === ".") {
    if (globalVariablesObj.lastItemOfActionsArray.includes(".")) {
      return;
    }
    if (
      !isNaN(globalVariablesObj.lastItemOfActionsArray) &&
      globalVariablesObj.lastItemOfActionsArray
    ) {
      globalVariablesObj.actionsArray[
        globalVariablesObj.lastIndexOfActionsArray
      ] = globalVariablesObj.lastItemOfActionsArray + value;
      showActions(globalVariablesObj);

      return;
    }
  }

  // number sign check
  if (value === "+/-") {
    if (globalVariablesObj.lastItemOfActionsArray.startsWith("-")) {
      globalVariablesObj.actionsArray[
        globalVariablesObj.lastIndexOfActionsArray
      ] = globalVariablesObj.lastItemOfActionsArray.slice(1);
      showActions(globalVariablesObj);

      return;
    }
    globalVariablesObj.actionsArray[
      globalVariablesObj.lastIndexOfActionsArray
    ] = "-" + globalVariablesObj.lastItemOfActionsArray;
    showActions(globalVariablesObj);

    return;
  }

  // for any other actions
  if (
    !isNaN(globalVariablesObj.lastItemOfActionsArray) ||
    globalVariablesObj.lastItemOfActionsArray === ")"
  ) {
    globalVariablesObj.actionsArray.push(value);
    showActions(globalVariablesObj);
    return;
  }
}