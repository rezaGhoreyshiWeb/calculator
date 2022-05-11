import { switcherTheme } from "./switcherTheme.js";
import { onloadThemeChecker } from "./onloadThemeChecker.js";
// elements
const switcherEl = document.getElementById("switcher");
const actionsEl = document.querySelectorAll(".actions");
const calculatesEl = document.getElementById("calculates");
const clearEl = document.getElementById("clear");

// declared variables
let bracketRight = false;
const actionsArray = [];

// events
switcherEl.addEventListener("click", switcherTheme);
window.addEventListener("load", onloadThemeChecker);
actionsEl.forEach((el) =>
  el.addEventListener("click", (e) => {
    const value = e.target.dataset.value ?? e.target.textContent.trim();

    actionsChecker(value);
  })
);

// functions

function actionsChecker(value) {
  const lastIndexOfActionsArray = actionsArray.length - 1;
  const lastItemOfActionsArray = actionsArray[lastIndexOfActionsArray];
  console.log(value);
  // bracket check
  if (value.includes("(")) {
    if (lastItemOfActionsArray === ")") return;
    if (bracketRight && lastItemOfActionsArray !== "(") {
      actionsArray.push(")");
      bracketRight = false;
      console.log(actionsArray);
      return;
    }
    if (!bracketRight) {
      if (actionsArray.length === 0 || isNaN(lastItemOfActionsArray)) {
        actionsArray.push("(");
        bracketRight = true;
        console.log(actionsArray);
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
      console.log(actionsArray);
      return;
    }
    actionsArray.push(value);
    console.log(actionsArray);
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
      console.log(actionsArray);
      return;
    }
  }

  // number sign check
  if (value === "+/-") {
    if (lastItemOfActionsArray.startsWith("-")) {
      actionsArray[lastIndexOfActionsArray] = lastItemOfActionsArray.slice(1);
      console.log(actionsArray);
      return;
    }
    actionsArray[lastIndexOfActionsArray] = "-" + lastItemOfActionsArray;
    console.log(actionsArray);
    return;
  }

  // for any other actions
  if (!isNaN(lastItemOfActionsArray) || lastItemOfActionsArray === ")") {
    actionsArray.push(value);
    console.log(actionsArray);
    return;
  }
}

function showActions() {
  calculatesEl.classList.remove("hidden");
  calculatesEl.innerHTML = "";
}
