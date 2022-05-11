import { switcherTheme } from "./switcherTheme.js";
import { onloadThemeChecker } from "./onloadThemeChecker.js";
// elements
const switcherEl = document.getElementById("switcher");
const actionsEl = document.querySelectorAll(".actions");
const calculatesEl = document.getElementById("calculates");
const clearEl = document.getElementById("clear");

// declared variables
let bracketRight = false;
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

// functions

function finedLastIndexAndItem() {
  lastIndexOfActionsArray = actionsArray.length - 1;
  lastItemOfActionsArray = actionsArray[lastIndexOfActionsArray];
}

function actionsChecker(value) {
  finedLastIndexAndItem();

  // bracket check
  if (value.includes("(")) {
    if (lastItemOfActionsArray === ")") return;
    if (bracketRight && lastItemOfActionsArray !== "(") {
      actionsArray.push(")");
      bracketRight = false;
      showActions();

      return;
    }
    if (!bracketRight) {
      if (actionsArray.length === 0 || isNaN(lastItemOfActionsArray)) {
        actionsArray.push("(");
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
    if (
      !isNaN(lastItemOfActionsArray) &&
      lastItemOfActionsArray &&
      !lastItemOfActionsArray?.includes(".")
    ) {
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

function showActions() {
  finedLastIndexAndItem();
  const lastHtmlItem = actionsHTMLArray[actionsHTMLArray.length - 1];
  let HTML;
  let HTMLObj;

  if (calculatesEl.classList.contains("hidden")) {
    calculatesEl.classList.remove("hidden");
  }
  if (!isNaN(lastItemOfActionsArray)) {
    if (lastHtmlItem.isNaN) {
      actionsHTMLArray.pop();
    }
    HTMLObj = {
      isNaN: true,
      html: `
    <span class="font-sans text-neutral-700 dark:text-gray-50">${lastItemOfActionsArray}</span
    `,
    };
  }
  if (isNaN(lastItemOfActionsArray)) {
    HTMLObj = {
      isNaN: false,
      html: `
      <span class="font-sans text-orange-400">${lastItemOfActionsArray}</span>
      `,
    };
  }
  actionsHTMLArray.push(HTMLObj);

  calculatesEl.innerHTML = "";
  actionsHTMLArray.forEach((item) => {
    calculatesEl.innerHTML += item.html;
  });
}

function clear() {
  actionsArray = [];
  actionsHTMLArray = [];
  bracketRight = false;

  calculatesEl.classList.add("hidden");
}
