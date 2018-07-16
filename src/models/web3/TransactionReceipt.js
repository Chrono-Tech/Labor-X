// https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionreceipt

export interface TransactionReceipt {
  status: boolean
  blockHash: string
  blockNumber: number
  transactionHash: string
  transactionIndex: number
  from: string
  to: string | null
  contractAddress: string | null
  cumulativeGasUsed: number
  gasUsed: number
  logs: Array<>
}
