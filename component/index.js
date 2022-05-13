import { switcherTheme } from "./switcherTheme.js";
import { onloadThemeChecker } from "./onloadThemeChecker.js";
import { remove } from "./remove.js";
import { finedLastIndexAndItem } from "./finedLastIndexAndItem.js";
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
const globalVariablesObj = {
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

// functions



export function showActions(globalVariablesObj) {
  finedLastIndexAndItem(globalVariablesObj);
  const lastHtmlItem =
    globalVariablesObj.actionsHTMLArray[
      globalVariablesObj.actionsHTMLArray.length - 1
    ];
  let HTMLObj;

  if (calculatesEl.classList.contains("hidden")) {
    calculatesEl.classList.remove("hidden");
  }
  if (globalVariablesObj.actionsArray.length === 0) {
    calculatesEl.classList.add("hidden");
    return;
  }

  if (!isNaN(globalVariablesObj.lastItemOfActionsArray)) {
    if (lastHtmlItem?.isNum) {
      globalVariablesObj.actionsHTMLArray.pop();
    }
    HTMLObj = {
      isNum: true,
      html: `
    <span class="font-sans text-neutral-700 dark:text-gray-50">${globalVariablesObj.lastItemOfActionsArray}</span
    `,
    };
  }

  if (isNaN(globalVariablesObj.lastItemOfActionsArray)) {
    if (globalVariablesObj.removeAction) {
      HTMLObj = null;
    } else {
      HTMLObj = {
        isNum: false,
        html: `
        <span class="font-sans text-orange-400">${globalVariablesObj.lastItemOfActionsArray}</span>
        `,
      };
    }
  }

  if (HTMLObj) {
    globalVariablesObj.actionsHTMLArray.push(HTMLObj);
  }

  calculatesEl.innerHTML = "";
  globalVariablesObj.actionsHTMLArray.forEach((item) => {
    calculatesEl.innerHTML += item.html;
  });
}


