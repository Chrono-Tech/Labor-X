export default (values) => {
  const confirm = values.confirm === values.mnemonic
  console.log('mnem', confirm)
  
  return {
    confirm: confirm ? null : 'Wrong field',
  }
}
