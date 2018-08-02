export default (values) => {
  return {
    confirm: values.confirm ? null : 'Please apply license',
  }
}
