import type { Transaction } from "./Transaction";
import type TransactionSignature from "./TransactionSignature";
import type DataSignature from "./DataSignature";
import type KeyStore from "./KeyStore";

interface Account {
  address: string;
  privateKey: string;
  signTransaction(transaction: Transaction): Promise<TransactionSignature>;
  sign(data: string): Promise<DataSignature>;
  encrypt(password: string): KeyStore;
}

export default Account