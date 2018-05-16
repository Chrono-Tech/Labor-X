export const filterArrayByIndexMask = (array, mask) => {
  const selection = []
  for (
    let v = mask, i = 0;
    v !== 0 && i < array.length;
    v = v >>> 1, i++
  ) {
    if (mask & 1) {
      selection.push(array[i])
    }
  }
  return selection
}
