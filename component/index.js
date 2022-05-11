import { switcherTheme } from "./switcherTheme.js";
import { onloadThemeChecker } from "./onloadThemeChecker.js";
// elements
const switcherEl = document.getElementById("switcher");
const actionsEl = document.querySelectorAll(".actions");
const calculatesEl = document.getElementById("calculates");
const clearEl = document.getElementById("clear");

// declared variables
let bracketRight = false;
let num;
let actionsArray = [];

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
  console.log(value);
  if (value.includes("(")) {
    if (actionsArray[actionsArray.length - 1] === ")") return;
    if (bracketRight && actionsArray[actionsArray.length - 1] !== "(") {
      actionsArray.push(")");
      bracketRight = false;
    }
    if (!bracketRight) {
      actionsArray.push("(");
      bracketRight = true;
    }
  }

  console.log(actionsArray);
}

function showActions() {
  calculatesEl.classList.remove("hidden");
  calculatesEl.innerHTML = "";
}
