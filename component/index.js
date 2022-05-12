import { switcherTheme } from "./switcherTheme.js";
import { onloadThemeChecker } from "./onloadThemeChecker.js";
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
removeEl.addEventListener("click", remove);
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

  calculatesEl.classList.add("hidden");
}

function remove() {
  finedLastIndexAndItem();
  removeAction = true;
  if (!isNaN(lastItemOfActionsArray)) {
    let numArray = lastItemOfActionsArray.split("");
    if (numArray.length > 1) {
      numArray.pop();
      actionsArray.pop();
      actionsArray.push(numArray.join(""));
      showActions();

      return;
    } else {
      actionsArray.pop();
      actionsHTMLArray.pop();
      showActions();

      return;
    }
  }
  if (lastItemOfActionsArray === "(") {
    bracketLeft = true;
    bracketRight = false;
    actionsArray.pop();
    actionsHTMLArray.pop();
    showActions();

    return;
  }
  if (lastItemOfActionsArray === ")") {
    bracketLeft = false;
    bracketRight = true;
    actionsArray.pop();
    actionsHTMLArray.pop();
    showActions();

    return;
  }

  actionsArray.pop();
  actionsHTMLArray.pop();
  showActions();
}

function findAllBracketsIndexes() {
  const bracketsIndex = [];
  actionsArray.forEach((item, index) => {
    if (item === "(" || item === ")") {
      bracketsIndex.push(index);
    }
  });
  return {
    hasBracket: bracketsIndex.length > 0 ? true : false,
    isOdd: bracketsIndex.length % 2 != 0,
    bracketsIndex,
  };
}

function calculatesActionsInsideTheBrackets(array) {
  let copyActionsArray;
  let bracketIndexInfo = findAllBracketsIndexes();
  if (!bracketIndexInfo.hasBracket) return array;
  if (bracketIndexInfo.hasBracket) {
    let bracketsIndex;
    const bracketsIndexesSeparate = [];
    let bracketsObjs = [];

    if (bracketIndexInfo.isOdd) {
      actionsArray.push(")");
      showActions();
      bracketIndexInfo = findAllBracketsIndexes();
    }
    bracketsIndex = bracketIndexInfo.bracketsIndex;

    if (bracketsIndex.length > 2) {
      // separate the pair indexes
      for (let i = 0; i < bracketsIndex.length; i += 2) {
        let index = i;
        const lowestIndex = bracketsIndex[index];
        const highestIndex = bracketsIndex[++index];
        bracketsIndexesSeparate.push([lowestIndex, highestIndex]);
      }
      // get the actions inside the bracket and create the obj of them
      bracketsIndexesSeparate.forEach((item) => {
        const obj = {
          lowestIndex: item[0],
          highestIndex: item[1],
          action: actionsArray.slice(++item[0], item[1]),
        };

        bracketsObjs.push(obj);
      });
    } else {
      const obj = {
        lowestIndex: bracketsIndex[0],
        highestIndex: bracketsIndex[1],
        action: actionsArray.slice(++bracketsIndex[0], bracketsIndex[1]),
      };
      bracketsObjs.push(obj);
    }

    // change the obj and get the result of actions
    bracketsObjs = bracketsObjs.map((obj) => {
      return {
        lowestIndex: obj.lowestIndex,
        highestIndex: obj.highestIndex,
        result: findOrderOfOperatorsThenCalculate(obj.action),
      };
    });

    // make a copy of action array and replace the results of brackets
    copyActionsArray = [...array];
    // we reverse it and start from the end of arr to don't change the indexes
    bracketsObjs = bracketsObjs.reverse();
    // replace array with results of brackets
    bracketsObjs.forEach((obj) => {
      replaceInArray(
        copyActionsArray,
        obj.lowestIndex,
        obj.highestIndex,
        obj.result
      );
    });

    return copyActionsArray;
  }
}

function findOrderOfOperatorsThenCalculate(array = []) {
  let actionArray = array;
  let indexOfMultiplyOrDivide;
  let indexOfAddingOrSubtraction;

  // for calculating * and /
  do {
    // for calculating * and /
    indexOfMultiplyOrDivide = actionArray.findIndex(
      (element) => element === "x" || element === "÷"
    );
    if (indexOfMultiplyOrDivide > -1) {
      const operator = actionArray[indexOfMultiplyOrDivide];
      const numOne = actionArray[--indexOfMultiplyOrDivide];
      const lowestIndex = indexOfMultiplyOrDivide;
      const numTwo = actionArray[(indexOfMultiplyOrDivide += 2)];
      const highestIndex = indexOfMultiplyOrDivide;
      const result = calculateOperators(operator, [numOne, numTwo]);
      replaceInArray(actionArray, lowestIndex, highestIndex, result);
    }
    // for calculating -  and  +

    indexOfAddingOrSubtraction = actionArray.findIndex(
      (element) => element === "-" || element === "+"
    );
    if (indexOfMultiplyOrDivide === -1 && indexOfAddingOrSubtraction > -1) {
      const operator = actionArray[indexOfAddingOrSubtraction];
      const numOne = actionArray[--indexOfAddingOrSubtraction];
      const lowestIndex = indexOfAddingOrSubtraction;
      const numTwo = actionArray[(indexOfAddingOrSubtraction += 2)];
      const highestIndex = indexOfAddingOrSubtraction;
      const result = calculateOperators(operator, [numOne, numTwo]);
      replaceInArray(actionArray, lowestIndex, highestIndex, result);
    }
  } while (actionArray.length > 1);

  return actionArray[0];
}

function replaceInArray(array, lowestIndex, highestIndex, value) {
  const deleteCount = highestIndex - lowestIndex + 1;
  return array.splice(lowestIndex, deleteCount, value);
}

function calculateOperators(operator, numbers) {
  switch (operator) {
    case "+":
      return +numbers[0] + +numbers[1];
    case "-":
      return +numbers[0] - +numbers[1];
    case "÷":
      return +numbers[0] / +numbers[1];
    case "x":
      return +numbers[0] * +numbers[1];
  }
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
