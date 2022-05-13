import { showActions } from "./index.js";

export function remove(
  globalVariablesObj,
  finedLastIndexAndItem,
  
) {
  finedLastIndexAndItem();
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
