export function replaceInArray(array, lowestIndex, highestIndex, value) {
  const deleteCount = highestIndex - lowestIndex + 1;
  return array.splice(lowestIndex, deleteCount, value);
}
