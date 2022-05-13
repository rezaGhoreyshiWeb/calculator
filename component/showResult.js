export function showResult(globalVariablesObj) {
  const result = calculateResult();
  globalVariablesObj.resultEl.textContent = result;
}
