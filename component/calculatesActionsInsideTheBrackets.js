import { findOrderOfOperatorsThenCalculate } from "./findOrderOfOperatorsThenCalculate.js";
import { replaceInArray } from "./replaceInArray.js";
import { findAllBracketsIndexes } from "./findAllBracketsIndexes.js";
import { showActions } from "./index.js";

export function calculatesActionsInsideTheBrackets(actionsArray) {
  let copyActionsArray;
  let bracketIndexInfo = findAllBracketsIndexes(actionsArray);
  if (!bracketIndexInfo.hasBracket) return [...actionsArray];
  if (bracketIndexInfo.hasBracket) {
    let bracketsIndex;
    const bracketsIndexesSeparate = [];
    let bracketsObjs = [];

    if (bracketIndexInfo.isOdd) {
      actionsArray.push(")");
      showActions();
      bracketIndexInfo = findAllBracketsIndexes(actionsArray);
    }
    bracketsIndex = bracketIndexInfo.bracketsIndex;

    if (bracketsIndex.length > 2) {
      // separate the pair indexes
      for (let i = 0; i < bracketsIndex.length; i += 2) {
        let index = i;
        const lowestIndex = bracketsIndex[index];
        const highestIndex = bracketsIndex[++index];
        bracketsIndexesSeparate.push([lowestIndex, highestIndex]);
      }
      // get the actions inside the bracket and create the obj of them
      bracketsIndexesSeparate.forEach((item) => {
        const obj = {
          lowestIndex: item[0],
          highestIndex: item[1],
          action: actionsArray.slice(++item[0], item[1]),
        };

        bracketsObjs.push(obj);
      });
    } else {
      const obj = {
        lowestIndex: bracketsIndex[0],
        highestIndex: bracketsIndex[1],
        action: actionsArray.slice(++bracketsIndex[0], bracketsIndex[1]),
      };
      bracketsObjs.push(obj);
    }

    // change the obj and get the result of actions
    bracketsObjs = bracketsObjs.map((obj) => {
      return {
        lowestIndex: obj.lowestIndex,
        highestIndex: obj.highestIndex,
        result: findOrderOfOperatorsThenCalculate(obj.action),
      };
    });

    // make a copy of action array and replace the results of brackets
    copyActionsArray = [...actionsArray];
    // we reverse it and start from the end of arr to don't change the indexes
    bracketsObjs = bracketsObjs.reverse();
    // replace array with results of brackets
    bracketsObjs.forEach((obj) => {
      replaceInArray(
        copyActionsArray,
        obj.lowestIndex,
        obj.highestIndex,
        obj.result
      );
    });

    return copyActionsArray;
  }
}
