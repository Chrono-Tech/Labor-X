export const txPublished = () => {
  return {
    type: 'TX/PUBLISHED',
    tx: {}
  }
}

export const txMined = () => {
  return {
    type: 'TX/MINED'
  }
}