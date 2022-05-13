export function findAllBracketsIndexes(actionsArray) {
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