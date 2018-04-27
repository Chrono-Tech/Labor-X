export default (values) => {
  const password = (values.password || '').trim()
  const confirmPassword = (values.confirmPassword || '').trim()

  return {
    password: password === confirmPassword ? password : null
  }
}
