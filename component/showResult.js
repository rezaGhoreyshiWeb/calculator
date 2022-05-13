import { calculateResult } from "./calculateResult.js";
export function showResult(globalVariablesObj) {
  const result = calculateResult(globalVariablesObj);
  globalVariablesObj.resultEl.textContent = result;
}
