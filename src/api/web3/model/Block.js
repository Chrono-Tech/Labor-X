// https://web3js.readthedocs.io/en/1.0/web3-eth.html#getblock

import type { Transaction } from "./Transaction";

export interface Block {
  number: number;
  hash: string;
  parentHash: string;
  nonce: string;
  sha3Uncles: string;
  logsBloom: string;
  transactionsRoot: string;
  stateRoot: string;
  miner: string;
  difficulty: string;
  totalDifficulty: string;
  extraData: string;
  size: number;
  gasLimit: number;
  gasUsed: number;
  timestamp: number;
  transactions: Array<Transaction>;
  uncles: Array<string>;
}