// https://web3js.readthedocs.io/en/1.0/web3-eth-accounts.html#wallet

import type Account from "./Account";
import type KeyStore from "./KeyStore";

interface Wallet { // Array-like object
  [ index: number ]: Account;
  [ addressLowerCased: string ]: Account;
  [ addressUpperCased: string ]: Account;
  create(numberOfAccounts: number, entropy?: string): Wallet;
  add(account: string|Account): Account;
  remove(account: string|number): boolean;
  save(password: string, keyName?: string): boolean;
  load(password: string, keyName?: string): Wallet;
  clear(): Wallet;
  encrypt(password: string): Array<KeyStore>;
  decrypt(keystoreArray: Array<KeyStore>, password: string): Wallet;
  length: number;
}

export default Wallet