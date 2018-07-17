import Signature from './Signature'

interface DataSignature extends Signature {
  message: string;
  signature: string;
}

export default DataSignature