export default (values) => {
  
  return {
    confirm: values.confirm ? null : 'Wrong field',
  }
}
