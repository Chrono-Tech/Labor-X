export default (values) => {
  const password = (values['password'] || '').trim()
  const passwordConfirm = (values['password-confirm'] || '').trim()
  return {
    'password': password ? null : 'Wrong password',
    'password-confirm': password === passwordConfirm && password ? null : 'Wrong confirm password',
    'isRecruiter': values.isRecruiter || values.isClient || values.isWorker ? null : 'Please select at least one of account type',
    'isClient': values.isRecruiter || values.isClient || values.isWorker ? null : 'Please select at least one of account type',
    'isWorker': values.isRecruiter || values.isClient || values.isWorker ? null : 'Please select at least one of account type',
  }
}
