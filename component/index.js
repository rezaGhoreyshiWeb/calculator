import { switcherTheme } from "./switcherTheme.js";
import { onloadThemeChecker } from "./onloadThemeChecker.js";
import { replaceInArray } from "./replaceInArray.js";
import { findOrderOfOperatorsThenCalculate } from "./findOrderOfOperatorsThenCalculate.js";
import { calculatesActionsInsideTheBrackets } from "./calculatesActionsInsideTheBrackets.js";
import { remove } from "./remove.js";

// elements
const switcherEl = document.getElementById("switcher");
const actionsEl = document.querySelectorAll(".actions");
const calculatesEl = document.getElementById("calculates");
const clearEl = document.getElementById("clear");
const removeEl = document.getElementById("remove");
const calculateResultEl = document.getElementById("calculate-result");
const resultEl = document.getElementById("result");

// declared variables

let bracketLeft = true;
let bracketRight = false;
let removeAction = false;
let lastIndexOfActionsArray;
let lastItemOfActionsArray;
let actionsArray = [];
let actionsHTMLArray = [];

// events
switcherEl.addEventListener("click", switcherTheme);
window.addEventListener("load", onloadThemeChecker);
actionsEl.forEach((el) =>
  el.addEventListener("click", (e) => {
    const value = e.target.dataset.value ?? e.target.textContent.trim();

    actionsChecker(value);
  })
);
clearEl.addEventListener("click", clear);
removeEl.addEventListener("click", () =>
  remove(
    actionsArray,
    finedLastIndexAndItem,
    removeAction,
    lastItemOfActionsArray,
    actionsHTMLArray,
    bracketLeft,
    bracketRight
  )
);
calculateResultEl.addEventListener("click", showResult);

// functions

function finedLastIndexAndItem() {
  lastIndexOfActionsArray = actionsArray.length - 1;
  lastItemOfActionsArray = actionsArray[lastIndexOfActionsArray];
}

function actionsChecker(value) {
  finedLastIndexAndItem();
  removeAction = false;

  // bracket check
  if (value.includes("(")) {
    if (lastItemOfActionsArray === ")") return;
    if (
      bracketRight &&
      lastItemOfActionsArray !== "(" &&
      !isNaN(lastItemOfActionsArray)
    ) {
      actionsArray.push(")");
      bracketRight = false;
      bracketLeft = true;
      showActions();

      return;
    }
    if (bracketLeft) {
      if (actionsArray.length === 0 || isNaN(lastItemOfActionsArray)) {
        actionsArray.push("(");
        bracketLeft = false;
        bracketRight = true;
        showActions();
      }
      return;
    }
  }
  // number check
  if (!isNaN(value)) {
    if (
      !isNaN(lastItemOfActionsArray) ||
      lastItemOfActionsArray?.includes(".")
    ) {
      actionsArray[lastIndexOfActionsArray] = lastItemOfActionsArray + value;
      showActions();

      return;
    }
    actionsArray.push(value);
    showActions();

    return;
  }
  // decimal check
  if (value === ".") {
    if (lastItemOfActionsArray.includes(".")) {
      return;
    }
    if (!isNaN(lastItemOfActionsArray) && lastItemOfActionsArray) {
      actionsArray[lastIndexOfActionsArray] = lastItemOfActionsArray + value;
      showActions();

      return;
    }
  }

  // number sign check
  if (value === "+/-") {
    if (lastItemOfActionsArray.startsWith("-")) {
      actionsArray[lastIndexOfActionsArray] = lastItemOfActionsArray.slice(1);
      showActions();

      return;
    }
    actionsArray[lastIndexOfActionsArray] = "-" + lastItemOfActionsArray;
    showActions();

    return;
  }

  // for any other actions
  if (!isNaN(lastItemOfActionsArray) || lastItemOfActionsArray === ")") {
    actionsArray.push(value);
    showActions();
    return;
  }
}

export function showActions() {
  finedLastIndexAndItem();
  const lastHtmlItem = actionsHTMLArray[actionsHTMLArray.length - 1];
  let HTMLObj;

  if (calculatesEl.classList.contains("hidden")) {
    calculatesEl.classList.remove("hidden");
  }
  if (actionsArray.length === 0) {
    calculatesEl.classList.add("hidden");
    return;
  }

  if (!isNaN(lastItemOfActionsArray)) {
    if (lastHtmlItem?.isNum) {
      actionsHTMLArray.pop();
    }
    HTMLObj = {
      isNum: true,
      html: `
    <span class="font-sans text-neutral-700 dark:text-gray-50">${lastItemOfActionsArray}</span
    `,
    };
  }

  if (isNaN(lastItemOfActionsArray)) {
    if (removeAction) {
      HTMLObj = null;
    } else {
      HTMLObj = {
        isNum: false,
        html: `
        <span class="font-sans text-orange-400">${lastItemOfActionsArray}</span>
        `,
      };
    }
  }

  if (HTMLObj) {
    actionsHTMLArray.push(HTMLObj);
  }

  calculatesEl.innerHTML = "";
  actionsHTMLArray.forEach((item) => {
    calculatesEl.innerHTML += item.html;
  });
}

function clear() {
  actionsArray = [];
  actionsHTMLArray = [];
  removeAction = false;
  lastIndexOfActionsArray = null;
  lastItemOfActionsArray = null;
  bracketLeft = true;
  bracketRight = false;
  resultEl.textContent = 0;

  calculatesEl.classList.add("hidden");
}

function calculateResult() {
  const simpleArray = calculatesActionsInsideTheBrackets(actionsArray);

  const finalResult = findOrderOfOperatorsThenCalculate(simpleArray);

  return finalResult;
}

function showResult() {
  const result = calculateResult();
  resultEl.textContent = result;
}
