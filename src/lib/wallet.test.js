import Wallet from 'ethereumjs-wallet';

describe('Wallet', () => {
  it('should read from V3', () => {
    const json = '{"version":3,"id":"c7ba05fc-3f57-46d7-bd5f-60e098698374","address":"4e95afd6515697e330271f1729840c60eec1cdaf","Crypto":{"ciphertext":"d1dd6f734ce9f125a4755666a92fad5d3330e8209955b177eb2b2f4d3ca9022f","cipherparams":{"iv":"dd9333dd6e23960ac5080c8b7aa40101"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"ed81fb1a28f69b870ba4ab18a0c4de935506ae4fc6f363029b9aa26f9d9aebc2","n":1024,"r":8,"p":1},"mac":"3ddce38c446a97c24f112f581dcf3fc4ffd053dda9c091da7f2696042f929712"}}';
    const wallet = Wallet.fromV3(json, '123456789', true);
    expect(wallet.getAddressString()).toEqual('0x4e95afd6515697e330271f1729840c60eec1cdaf');
  })
})