export { default as LoginOptions } from './LoginOptions/LoginOptions'
export { default as SelectOption } from './SelectOption/SelectOption'

export { default as PrivateKeyForm } from './PrivateKeyForm/PrivateKeyForm'
export { default as WalletFileForm } from './WalletFileForm/WalletFileForm'
export { default as MnemonicForm } from './MnemonicForm/MnemonicForm'
export { default as LearnMoreBlock } from './LearnMoreBlock/LearnMoreBlock'
export { default as LoginForm } from './LoginForm/LoginForm'
export { default as RecoveryAccountForm } from './RecoveryAccountForm/RecoveryAccountForm'

export const LoginSteps = {
  Ledger: 'ledger',
  Trezor: 'trezor',
  BrowserPlugIn: 'browserPlugIn',
  Mnemonic: 'mnemonic',
  PrivateKey: 'privateKey',
  WalletFile: 'walletFile'
}
