import { showActions } from "./index.js";
import { finedLastIndexAndItem } from "./finedLastIndexAndItem.js";

export function remove(globalVariablesObj) {
  finedLastIndexAndItem(globalVariablesObj);
  globalVariablesObj.removeAction = true;
  if (!isNaN(globalVariablesObj.lastItemOfActionsArray)) {
    let numArray = globalVariablesObj.lastItemOfActionsArray.split("");
    if (numArray.length > 1) {
      numArray.pop();
      globalVariablesObj.actionsArray.pop();
      globalVariablesObj.actionsArray.push(numArray.join(""));
      showActions();

      return;
    } else {
      globalVariablesObj.actionsArray.pop();
      globalVariablesObj.actionsHTMLArray.pop();
      showActions();

      return;
    }
  }
  if (globalVariablesObj.lastItemOfActionsArray === "(") {
    globalVariablesObj.bracketLeft = true;
    globalVariablesObj.bracketRight = false;
    globalVariablesObj.actionsArray.pop();
    globalVariablesObj.actionsHTMLArray.pop();
    showActions();

    return;
  }
  if (globalVariablesObj.lastItemOfActionsArray === ")") {
    globalVariablesObj.bracketLeft = false;
    globalVariablesObj.bracketRight = true;
    globalVariablesObj.actionsArray.pop();
    globalVariablesObj.actionsHTMLArray.pop();
    showActions();

    return;
  }

  globalVariablesObj.actionsArray.pop();
  globalVariablesObj.actionsHTMLArray.pop();
  showActions();
}
