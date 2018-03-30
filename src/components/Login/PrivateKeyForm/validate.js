import { privateKey } from 'models/validator'

export default (values) => {
  const pk = values.privateKey ? values.privateKey.trim() : ''
  return {
    privateKey: privateKey(pk),
  }
}

