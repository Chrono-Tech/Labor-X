export default (values) => {
  const password = (values.password || '').trim()
  
  return {
    password: password,
  }
}
