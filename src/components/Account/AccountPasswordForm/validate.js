export default (values) => {
  const password = (values['password'] || '').trim()
  const passwordConfirm = (values['password-confirm'] || '').trim()
  
  return {
    'password': password ? null : 'Wrong password',
    'password-confirm': password === passwordConfirm && password ? null : 'Wrong confirm password',
  }
}
