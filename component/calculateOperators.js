export function calculateOperators(operator, numbers) {
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
