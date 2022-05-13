import { findOrderOfOperatorsThenCalculate } from "./findOrderOfOperatorsThenCalculate.js";
import { calculatesActionsInsideTheBrackets } from "./calculatesActionsInsideTheBrackets.js";
import { globalVariablesObj } from "./index.js";

export function calculateResult() {
  const simpleArray = calculatesActionsInsideTheBrackets(
    globalVariablesObj.actionsArray
  );

  const finalResult = findOrderOfOperatorsThenCalculate(simpleArray);

  return finalResult;
}
