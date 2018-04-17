export default class TestPRCNode {
  constructor () {
    this.protocol = 'http'
    this.host = 'localhost'
    this.port = 8545
    this.name = 'TestPRC'
  }

  getURL () {
    return `${this.protocol}://${this.host}:${this.port}`
  }

  getProtocol () {
    return this.protocol
  }
}
