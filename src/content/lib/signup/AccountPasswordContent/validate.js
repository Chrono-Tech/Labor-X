export default (values) => {

  const password = (values['password'] || '').trim()
  const passwordConfirm = (values['password-confirm'] || '').trim()

  return {
    'password': password ? null : 'Wrong password',
    'password-confirm': password === passwordConfirm && password ? null : 'Wrong confirm password',
    roles: values.roles.isRecruiter || values.roles.isClient || values.roles.isWorker ? null : 'Please select at least one of account type'
  }
}
