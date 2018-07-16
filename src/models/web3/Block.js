// https://web3js.readthedocs.io/en/1.0/web3-eth.html#getblock

import Transaction from "./Transaction";

interface Block {
  number: number | null;
  hash: string | null;
  parentHash: string;
  nonce: string | null;
  sha3Uncles: string;
  logsBloom: string | null;
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
  transactions: Array<string> | Array<Transaction>;
  uncles: Array<string>;
}

export default Block