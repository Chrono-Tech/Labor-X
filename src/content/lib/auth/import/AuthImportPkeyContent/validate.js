import { isValidSeed } from 'src/utils/index'

export default (values) => {

  const pk = values.privateKey ? values.privateKey.trim() : ''
  const pkError = isValidSeed(pk)
    ? null
    : 'Invalid seed'
  return {
    key: pk && !pkError ? null : pkError,
  }
}
