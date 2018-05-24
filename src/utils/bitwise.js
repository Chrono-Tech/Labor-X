export const FILTER_MODE_EVERY = 'every'
export const FILTER_MODE_ODD = 'even'
export const FILTER_MODE_EVEN = 'odd'

export const filterArrayByIndexMask = (array, mask, mode = FILTER_MODE_EVERY) => {
  switch (mode) {
    case FILTER_MODE_EVERY:
      return filterArrayByEveryIndexMask(array, mask)
    case FILTER_MODE_ODD:
      return filterArrayByOddIndexMask(array, mask)
    case FILTER_MODE_EVEN:
      return filterArrayByEvenIndexMask(array, mask)
  }
  throw new Error('Not supported mode')
}

const filterArrayByEveryIndexMask = (array, mask) => {
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

const filterArrayByOddIndexMask = (array, mask) => {
  const selection = []
  for (
    let v = mask, i = 0;
    v !== 0 && i < array.length;
    v = v >>> 2, i++
  ) {
    if (mask & 1) {
      selection.push(array[i])
    }
  }
  return selection
}

const filterArrayByEvenIndexMask = (array, mask) => {
  return filterArrayByOddIndexMask(array, mask >>> 1)
}
