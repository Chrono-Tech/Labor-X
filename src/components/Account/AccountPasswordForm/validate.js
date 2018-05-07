export default (values) => {
  console.log('values', values)
  console.log('client', (values.recruiter || values.worker || values.client) )
  const password = (values['password'] || '').trim()
  const passwordConfirm = (values['password-confirm'] || '').trim()
  
  return {
    'password': password ? null : 'Wrong password',
    'password-confirm': password === passwordConfirm && password ? null : 'Wrong confirm password',
    // 'client': (values.recruiter || values.worker || values.client) ? null : 'One field required',
  }
}
