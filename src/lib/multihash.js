//@flow
import baseX from 'base-x';
const BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

const base58 = baseX(BASE58)
const hex = baseX('0123456789abcdef')

/**
 * Convert bytes32 to IPFS multihash
 *
 * @param hexStr - a 32 bytes hex string starts with 0x
 * @returns {string} - base58 string
 */
export function toHash(hexStr: string): string {
  return base58.encode(hex.decode('1220' + hexStr.slice(2)))
}

/**
 * Convert IPFS multihash to hex string bytes32. Drops first 2 bytes (1220).
 *
 * @param multihash - Base58 IPFS multihash
 * @returns {string} - hex string starts with 0x prefix
 */
export function fromHash(multihash: string): string {
  return '0x' + hex.encode(base58.decode(multihash).slice(2));
}