// @flow
import bip39 from 'bip39';
import hdkey from 'ethereumjs-wallet/hdkey';
import ProviderEngine from 'web3-provider-engine';
import WalletSubprovider from 'web3-provider-engine/subproviders/wallet.js';
import Web3Subprovider from 'web3-provider-engine/subproviders/web3.js';
import Web3 from 'web3';

/**
 * Light wrapper to instantiate web3 from mnemonic phrase
 */
export class MnemonicWeb3 {
  constructor (mnemonic) {
    this.mnemonic = mnemonic
  }

  createInstance () {
    const hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(this.mnemonic))

    // Get the first account using the standard hd path.
    const walletHDPath = 'm/44\'/60\'/0\'/0/'
    const wallet = hdwallet.derivePath(walletHDPath + '0').getWallet()

    const providerUrl = 'https://testnet.infura.io'

    const engine = new ProviderEngine()
    engine.addProvider(new WalletSubprovider(wallet, {}))
    engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(providerUrl)))
    engine.start() // Required by the provider engine.

    return new Web3(engine)
  }
}
