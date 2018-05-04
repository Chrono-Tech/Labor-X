export default (values) => {
  
  const password = (values.password || '').trim()
  const passwordConfirm = (values.passwordConfirm || '').trim()
  
  return {
    password: password ? null : 'Wrong password',
    passwordConfirm: password === passwordConfirm && password ? null : 'Wrong confirm password',
  }
}
