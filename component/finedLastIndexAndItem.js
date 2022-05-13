export function finedLastIndexAndItem(globalVariablesObj) {
  globalVariablesObj.lastIndexOfActionsArray =
    globalVariablesObj.actionsArray.length - 1;
  globalVariablesObj.lastItemOfActionsArray =
    globalVariablesObj.actionsArray[globalVariablesObj.lastIndexOfActionsArray];
}