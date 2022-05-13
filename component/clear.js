import { globalVariablesObj } from "./index.js";

export function clear() {
  globalVariablesObj.actionsArray = [];
  globalVariablesObj.actionsHTMLArray = [];
  globalVariablesObj.removeAction = false;
  globalVariablesObj.lastIndexOfActionsArray = null;
  globalVariablesObj.lastItemOfActionsArray = null;
  globalVariablesObj.bracketLeft = true;
  globalVariablesObj.bracketRight = false;
  globalVariablesObj.resultEl.textContent = 0;

  globalVariablesObj.calculatesEl.classList.add("hidden");
}
