import type Block from "./model/Block";
// import type {Transaction} from "../../models/web3/Transaction";
// import type {TransactionReceipt} from "../../models/web3/TransactionReceipt";

import web3 from './web3'

// export const searchTransaction = async ( // last 100 blocks
//   web3,
//   address: string,
//   page = 1,
// ): Promise<Array<{ transaction: Transaction, transactionReceipt: TransactionReceipt }>> => {
//
//   const blockNumber = await web3.eth.getBlockNumber()
//   const blocks = await Promise.all([...Array(100 * page)].map((x, i) => web3.eth.getBlock(blockNumber - i, true)))
//   const transactions = blocks.reduce((x, block: Block) => x.concat(block ? block.transactions : []), []).filter(x => x.from.toLowerCase() === address.toLowerCase())
//   // const userTransactions = transactions.filter(x => x.from && x.from.toLowerCase() === address.toLowerCase() || x.to && x.to.toLowerCase() === address.toLowerCase())
//   const transactionsReceipts = await Promise.all(transactions.map(x => web3.eth.getTransactionReceipt(x.hash)))
//   return transactions.map((x, i) => ({ transaction: x, transactionReceipt: transactionsReceipts[i] }))
// }


export const searchBlock = async (take: number = 10, skip: number = 0) => {
  const blockNumber = await web3.eth.getBlockNumber()
  return await Promise.all([ ...Array(take) ].map((x, i) => web3.eth.getBlock(blockNumber - skip - i, true)))
}