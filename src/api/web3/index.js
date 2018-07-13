export const searchTransaction = async ( // last 100 blocks
  web3,
  address: string,
  page = 1,
): Promise<Object> => {
  const blockNumber = await web3.eth.getBlockNumber()
  const blocks = await Promise.all([...Array(100 * page)].map((x, i) => web3.eth.getBlock(blockNumber - i, true)))
  const transactions = blocks.reduce((x, block) => x.concat(block ? block.transactions : []), [])
  const userTransactions = transactions.filter(x => x.from && x.from.toLowerCase() === address.toLowerCase() || x.to && x.to.toLowerCase() === address.toLowerCase())
  return userTransactions
}
