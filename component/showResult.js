import { calculateResult } from "./calculateResult.js";
import { globalVariablesObj } from "./index.js";

export function showResult() {
  const result = calculateResult();
  globalVariablesObj.resultEl.textContent = result;
}
