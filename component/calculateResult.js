import { findOrderOfOperatorsThenCalculate } from "./findOrderOfOperatorsThenCalculate.js";

export function calculateResult(globalVariablesObj) {
  const simpleArray = calculatesActionsInsideTheBrackets(
    globalVariablesObj.actionsArray
  );

  const finalResult = findOrderOfOperatorsThenCalculate(simpleArray);

  return finalResult;
}
