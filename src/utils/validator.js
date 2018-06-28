export const required = (value) => !value ? 'Required' : null

export const minLength = minLength => value => value.length >= minLength
export const length = (length) => (value) => value.length === length ? null : '5 characters length'
export const maxLength = maxLength => value => value.length <= maxLength

export const address = (value, required = true, blockchain = 'Ethereum') => {
  if ((!value && required) || (value && !/^0x[0-9a-f]{40}$/i.test(value))) {
    return `Should be valid ${blockchain} address`
  }
  return null
}

export const isDefined = (value) => {
  return typeof value === 'undefined' || value === null ? 'Required' : ''
}

export const name = (value, required = true) => {
  if (value && !/^[A-z0-9 ]/.test(value)) {
    return 'String must have only Latin characters (A-z), numbers (0-9) and spaces'
  }
  if ((!value && required) || (value && value.length < 3)) {
    return 'Should have length more than or equal 3 symbols'
  }
  return null
}

export const bytes32 = (value) => {
  return value && value.length > 32 ? 'Should have length less than or equal 32 symbols' : null
}

export const email = (value, required = true) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if ((!value && required) || (value && !re.test(value))) {
    return 'Should be valid email address'
  }
  return null
}

export const url = (value, required = true) => {
  const re = /(http(s)?:\/\/)?[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  if ((!value && required) || (value && !re.test(value))) {
    return 'Should be valid URL'
  }
  return null
}

export const positiveInt = (value) => {
  if (!/^[1-9][\d]*$/.test(value)) {
    return 'Should be a positive integer'
  }
  return null
}

export const between = (value, min, max, required = true) => {
  if (!required && value === '') {
    return null
  }
  if (isNaN(value) || value < min || value > max) {
    return 'Should be between ${min} and ${max}'
  }
  return null
}

export const positiveNumber = (value) => isNaN(value) || !(value > 0) ? 'Should be a positive number' : null

export const positiveNumberOrZero = (value) => isNaN(value) || !(value >= 0) ? 'Should be a positive number or zero' : null

export const validIpfsFileList = (value) => (!!value && value.indexOf('!') === 0)
  // '!' marks partially uploaded or inconsistent objects
  ? 'Should be valid file list'
  : null

export const currencyNumber = (value, decimals) => {
  const invalidPositiveNumber = positiveNumber(value)
  if (!invalidPositiveNumber) {
    const matcher = new RegExp(`^\\d+${decimals > 0 ? `(\\.\\d{1,${decimals}})?` : ''}$`)
    return !matcher.test(value) ? `Should have maximum ${decimals} decimal places` : null
  }
  return invalidPositiveNumber
}

export function lowerThan (value, limit, isEqual = false) {
  const isPassed = isEqual ? value <= limit : value < limit
  return !isPassed ? isEqual ? `Should be lower or equal than ${limit}` : `Should be lower than ${limit}` : null
}

export function moreThan (value, limit, isEqual = false) {
  const isPassed = isEqual ? value >= limit : value > limit
  return !isPassed ? isEqual ? 'Should be more than ${limit}' : 'Should be more or equal than ${limit}' : null
}

export default {
  required,
  address,
  name,
  email,
  url,
  positiveInt,
  between,
  positiveNumber,
  positiveNumberOrZero,
  currencyNumber,
  lowerThan,
  moreThan,
  validIpfsFileList,
}
