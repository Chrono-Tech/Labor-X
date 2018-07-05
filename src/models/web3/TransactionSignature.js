import Signature from './Signature'

interface TransactionSignature extends Signature {
  rawTransaction: string;
}

export default TransactionSignature