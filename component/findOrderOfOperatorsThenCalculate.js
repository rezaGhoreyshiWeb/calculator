import { calculateOperators } from "./calculateOperators.js";
import { replaceInArray } from "./replaceInArray.js";
export function findOrderOfOperatorsThenCalculate(array = []) {
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
