export default (values) => {
  const password = (values.password || '').trim()
  const passwordConfirm = (values.passwordConfirm || '').trim()

  return {
    walletName: values.walletName ? null: 'Wrong wallet name',
    password: password ? null : 'Wrong password',
    passwordConfirm: password === passwordConfirm && password ? null : 'Wrong confirm password',
  }
}
