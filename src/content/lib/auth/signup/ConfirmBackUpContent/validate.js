export default (values, props) => {
  return {
    mnemonicConfirmation: values.mnemonicConfirmation === props.mnemonic ? null : 'Wrong mnemonic',
  }
}
