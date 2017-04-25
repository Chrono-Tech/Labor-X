import {toHash, fromHash} from './multihash';

describe("multihash", () => {
  it('should convert bytes32 hex string to/from base58 IPFS multihash', () => {
    const hash = 'Qma3qbWDGJc6he3syLUTaRkJD3vAq1k5569tNMbUtjAZjf';
    expect(toHash(fromHash(hash))).toEqual(hash);
  })

  it('should convert multihash to hex string of 20 bytes and 0x prefix', () => {
    const hash = 'Qma3qbWDGJc6he3syLUTaRkJD3vAq1k5569tNMbUtjAZjf';
    expect(fromHash(hash).length).toEqual(66);
  })
})