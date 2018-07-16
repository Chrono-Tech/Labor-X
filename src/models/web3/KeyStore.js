// https://web3js.readthedocs.io/en/1.0/web3-eth-accounts.html#encrypt

interface CipherParam {
  iv: string;
}

interface KdfParam {
  dklen: number;
  salt: string;
  n: number;
  r: number;
  p: number;
}

interface KeyStoreCrypto {
  ciphertext: string;
  cipherparams: Array<CipherParam>;
  cipher: string;
  kdf: string;
  kdfparams: Array<KdfParam>,
  mac: string;
}

interface KeyStore {
  version: 3;
  id: string;
  address: string;
  crypto: KeyStoreCrypto;
}

export default KeyStore