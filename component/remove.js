import { showActions } from "./index.js";

export function remove(
  actionsArray,
  finedLastIndexAndItem,
  removeAction,
  lastItemOfActionsArray,
  actionsHTMLArray,
  bracketLeft,
  bracketRight
) {
  finedLastIndexAndItem();
  removeAction = true;
  if (!isNaN(lastItemOfActionsArray)) {
    let numArray = lastItemOfActionsArray.split("");
    if (numArray.length > 1) {
      numArray.pop();
      actionsArray.pop();
      actionsArray.push(numArray.join(""));
      showActions();

      return;
    } else {
      actionsArray.pop();
      actionsHTMLArray.pop();
      showActions();

      return;
    }
  }
  if (lastItemOfActionsArray === "(") {
    bracketLeft = true;
    bracketRight = false;
    actionsArray.pop();
    actionsHTMLArray.pop();
    showActions();

    return;
  }
  if (lastItemOfActionsArray === ")") {
    bracketLeft = false;
    bracketRight = true;
    actionsArray.pop();
    actionsHTMLArray.pop();
    showActions();

    return;
  }

  actionsArray.pop();
  actionsHTMLArray.pop();
  showActions();
}
