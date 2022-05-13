import { switcherTheme } from "./switcherTheme.js";
import { onloadThemeChecker } from "./onloadThemeChecker.js";
import { remove } from "./remove.js";
import { clear } from "./clear.js";
import { showResult } from "./showResult.js";
import { actionsChecker } from "./actionsChecker.js";

// elements
const switcherEl = document.getElementById("switcher");
const actionsEl = document.querySelectorAll(".actions");
const calculatesEl = document.getElementById("calculates");
const clearEl = document.getElementById("clear");
const removeEl = document.getElementById("remove");
const calculateResultEl = document.getElementById("calculate-result");
const resultEl = document.getElementById("result");

// declared variables
export const globalVariablesObj = {
  bracketLeft: true,
  bracketRight: false,
  removeAction: false,
  lastIndexOfActionsArray: null,
  lastItemOfActionsArray: null,
  actionsArray: [],
  actionsHTMLArray: [],
  resultEl,
  calculatesEl,
};

// events
switcherEl.addEventListener("click", switcherTheme);
window.addEventListener("load", onloadThemeChecker);
actionsEl.forEach((el) =>
  el.addEventListener("click", (e) => {
    const value = e.target.dataset.value ?? e.target.textContent.trim();

    actionsChecker(value, globalVariablesObj);
  })
);
clearEl.addEventListener("click", () => clear(globalVariablesObj));
removeEl.addEventListener("click", () => remove(globalVariablesObj));
calculateResultEl.addEventListener("click", () =>
  showResult(globalVariablesObj)
);



