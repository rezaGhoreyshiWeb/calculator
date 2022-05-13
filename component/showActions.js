import { globalVariablesObj } from "./index.js";
import { finedLastIndexAndItem } from "./finedLastIndexAndItem.js";

export function showActions() {
  finedLastIndexAndItem(globalVariablesObj);
  const lastHtmlItem =
    globalVariablesObj.actionsHTMLArray[
      globalVariablesObj.actionsHTMLArray.length - 1
    ];
  let HTMLObj;

  if (globalVariablesObj.calculatesEl.classList.contains("hidden")) {
    globalVariablesObj.calculatesEl.classList.remove("hidden");
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

  globalVariablesObj.calculatesEl.innerHTML = "";
  globalVariablesObj.actionsHTMLArray.forEach((item) => {
    globalVariablesObj.calculatesEl.innerHTML += item.html;
  });
}
