import { required } from 'models/validator'

export default (values) => {
  const wallet = values.walletFile && values.walletFile.content

  return {
    walletFile: required(wallet),
    walletPassword: required(values.walletPassword),
  }
}
