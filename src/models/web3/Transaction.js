export interface Transaction {
  nonce?: string;
  chainId?: string;
  to?: string;
  data?: string;
  value?: string;
  gasPrice?: string;
  gas: string;
}