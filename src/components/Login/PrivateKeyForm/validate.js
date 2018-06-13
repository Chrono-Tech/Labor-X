import { isValidSeed } from 'src/utils'

export default (values) => {

  const pk = values.key ? values.key.trim() : ''
  const pkError = isValidSeed(pk)
    ? null
    : 'Invalid seed'
  return {
    key: pk && !pkError ? null : pkError,
  }
}
