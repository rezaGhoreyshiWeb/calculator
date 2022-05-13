import { showActions } from "./showActions.js";
import { finedLastIndexAndItem } from "./finedLastIndexAndItem.js";
import { globalVariablesObj } from "./index.js";


export function actionsChecker(value) {
  finedLastIndexAndItem();
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
      showActions();

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
        showActions();
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
      showActions();

      return;
    }
    globalVariablesObj.actionsArray.push(value);
    showActions();

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
      showActions();

      return;
    }
  }

  // number sign check
  if (value === "+/-") {
    if (globalVariablesObj.lastItemOfActionsArray.startsWith("-")) {
      globalVariablesObj.actionsArray[
        globalVariablesObj.lastIndexOfActionsArray
      ] = globalVariablesObj.lastItemOfActionsArray.slice(1);
      showActions();

      return;
    }
    globalVariablesObj.actionsArray[
      globalVariablesObj.lastIndexOfActionsArray
    ] = "-" + globalVariablesObj.lastItemOfActionsArray;
    showActions();

    return;
  }

  // for any other actions
  if (
    !isNaN(globalVariablesObj.lastItemOfActionsArray) ||
    globalVariablesObj.lastItemOfActionsArray === ")"
  ) {
    globalVariablesObj.actionsArray.push(value);
    showActions();
    return;
  }
}