import moment from "moment/moment";
import Transaction from './model/Transaction'

export const selectLastBlockNumber = async (web3) => web3.eth.getBlockNumber()
export const getTransactionReceipt = async (web3, hash) => web3.eth.getTransactionReceipt(hash)

export interface TransactionLogs {
  [ day: string ]: Array<Transaction>
}
export interface SelectTransactionLogsResults {
  transactionLogs: TransactionLogs,
  lastBlockNumber: number;
}
export const selectTransactionLogs = async (web3, userAddress, fromBlockNumber): Promise<SelectTransactionLogsResults> => {
  const LIMIT = 1000
  const limit = fromBlockNumber > LIMIT ? LIMIT : fromBlockNumber
  const blocks = await Promise.all([ ...Array(limit) ].map((x, i) => web3.eth.getBlock(fromBlockNumber - i, true)))
  const blocksHashMap = blocks.reduce((x, block) => ({ ...x, [ block.hash ]: block }), {})
  const transactions = blocks
    .reduce((x, block) => x.concat(block.transactions), [])
    .filter((x) => x.from && x.to)
    .filter((x) => x.from.toLowerCase() === userAddress.toLowerCase() || x.to.toLowerCase() === userAddress.toLowerCase())
  const transactionReceipts = await Promise.all(transactions.map((x) => getTransactionReceipt(web3, x.hash)))
  const transactionLogs = transactions
    .map((x, i) => ({ ...x, receipt: transactionReceipts[i] }))
    .map((x) => ({ transaction: x, day: moment(blocksHashMap[x.blockHash].timestamp * 1000).startOf('day').toISOString() }))
    .reduce((x, { transaction, day }) => ({ ...x, [ day ]: [ ...(x[ day ] || []), transaction ] }), {})
  return { transactionLogs, lastBlockNumber: fromBlockNumber - limit }
}