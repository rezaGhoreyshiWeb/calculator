export let bracket = null;
export let calculates = "";
export let num = "";
export function actionsChecker(value) {
  if (value === "()") {
    if (calculates.endsWith(")")) {
      return;
    }
    if (bracket) {
      calculates += " ) ";
      bracket = false;
      return;
    } else {
      calculates += " ( ";
      bracket = true;
      return;
    }
  } else if (value === ".") {
    if (num.endsWith(".")) {
      return;
    }
    if (!num) {
      return;
    }

    calculates = calculates.replace(num, `${num}.`);
    num = `${num}.`;

    return;
  } else if (value === "+/-") {
    if (num.startsWith("-")) {
      num = num.slice(1);
      calculates.replace(`-${num}`, num);
    }

    calculates.replace(num, `-${num}`);
    return;
  } else if (!isNaN(value)) {
    if (calculates.endsWith(num)) {
      calculates.replace(num, num + value);
      num += value;
      return;
    }
    num = value;
    calculates = num;
    return;
  }
  calculates += ` ${value} `;
}
