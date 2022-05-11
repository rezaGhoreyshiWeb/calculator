import { switcherTheme } from "./switcherTheme.js";
import { onloadThemeChecker } from "./onloadThemeChecker.js";
// elements
const switcherEl = document.getElementById("switcher");
const actionsEl = document.querySelectorAll(".actions");
const calculatesEl = document.getElementById("calculates");
const clearEl = document.getElementById("clear");
const removeEl = document.getElementById("remove");

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
removeEl.addEventListener("click", remove);
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
    console.log('bracket');
    console.log(actionsArray);
    if (
      bracketRight &&
      lastItemOfActionsArray !== "(" &&
      !isNaN(lastItemOfActionsArray)
    ) {
      console.log('bracket push to array');
      actionsArray.push(")");
      bracketRight = false;
      bracketLeft = true;
      showActions();

      return;
    }
    if (bracketLeft) {
      if (actionsArray.length === 0 || isNaN(lastItemOfActionsArray)) {
        actionsArray.push("(");
        bracketLeft = false
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
    console.log('other');
    actionsArray.push(value);
    showActions();
    return;
  }
}

function showActions() {
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
  console.log(actionsHTMLArray);
  console.log(actionsArray);

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

function remove() {
  finedLastIndexAndItem();
  removeAction = true;
  if (!isNaN(lastItemOfActionsArray)) {
    console.log("come");
    let numArray = lastItemOfActionsArray.split("");
    if (numArray.length > 1) {
      numArray.pop();
      actionsArray.pop();
      actionsArray.push(numArray.join(""));
      showActions();
      console.log(actionsArray);
      console.log(actionsHTMLArray);
      return;
    } else {
      actionsArray.pop();
      actionsHTMLArray.pop();
      showActions();
      console.log(actionsArray);
      console.log(actionsHTMLArray);
      return;
    }
  }
  if (lastItemOfActionsArray === "(") {
    bracketLeft = true
    bracketRight = false;
    actionsArray.pop();
    actionsHTMLArray.pop();
    showActions();
    console.log(actionsArray);
    console.log(actionsHTMLArray);
    return;
  }
  if (lastItemOfActionsArray === ")") {
    bracketLeft = false;
    bracketRight = true;
    actionsArray.pop();
    actionsHTMLArray.pop();
    showActions();
    console.log(actionsArray);
    console.log(actionsHTMLArray);
    return;
  }

  actionsArray.pop();
  actionsHTMLArray.pop();
  showActions();
  console.log(actionsArray);
  console.log(actionsHTMLArray);
}
