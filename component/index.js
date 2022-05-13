import { switcherTheme } from "./switcherTheme.js";
import { onloadThemeChecker } from "./onloadThemeChecker.js";
import { replaceInArray } from "./replaceInArray.js";
import { findOrderOfOperatorsThenCalculate } from "./findOrderOfOperatorsThenCalculate.js";
import { calculatesActionsInsideTheBrackets } from "./calculatesActionsInsideTheBrackets.js";
import { remove } from "./remove.js";
import { finedLastIndexAndItem } from "./finedLastIndexAndItem.js";
import { clear } from "./clear.js";

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

    actionsChecker(value);
  })
);
clearEl.addEventListener("click", () => clear(globalVariablesObj));
removeEl.addEventListener("click", () => remove(globalVariablesObj));
calculateResultEl.addEventListener("click", showResult);

// functions

function actionsChecker(value) {
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

export function showActions() {
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

function calculateResult() {
  const simpleArray = calculatesActionsInsideTheBrackets(
    globalVariablesObj.actionsArray
  );

  const finalResult = findOrderOfOperatorsThenCalculate(simpleArray);

  return finalResult;
}

function showResult() {
  const result = calculateResult();
  globalVariablesObj.resultEl.textContent = result;
}
