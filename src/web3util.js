// @flow
import bip39 from 'bip39';
import hdkey from 'ethereumjs-wallet/hdkey';
import Wallet from 'ethereumjs-wallet';
import ProviderEngine from 'web3-provider-engine';
import WalletSubprovider from 'web3-provider-engine/subproviders/wallet.js';
import Web3Subprovider from 'web3-provider-engine/subproviders/web3.js';
import Web3 from 'web3';
import {toBuffer} from 'ethereumjs-util';

/**
 * Light wrapper to instantiate web3
 */
export class Web3Util {

  static createInstance(wallet) {
    const providerUrl = 'https://testnet.infura.io'

    const engine = new ProviderEngine()
    engine.addProvider(new WalletSubprovider(wallet, {}))
    engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(providerUrl)))
    engine.start() // Required by the provider engine.

    return new Web3(engine)
  }

  static createFromMnemonic(mnemonic) {
    return Web3Util.createInstance(Web3Util.hdWallet(mnemonic));
  }

  static createFromPrivateKey(privateKey: string) {
    return Web3Util.createInstance(Web3Util.privateKeyWallet(privateKey))
  }

  static createFromV3(json: string, password: string) {
    return Web3Util.createInstance(Wallet.fromV3(json, password, true));
  }

  static hdWallet(mnemonic): Wallet {
    const hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic))
    // Get the first account using the standard hd path.
    const walletHDPath = 'm/44\'/60\'/0\'/0/'
    return hdwallet.derivePath(walletHDPath + '0').getWallet()
  }

  static privateKeyWallet(privateKey: string): Wallet {
    return Wallet.fromPrivateKey(toBuffer(privateKey))
  }
}
