// import BigNumber from 'bignumber.js'
import { BoardModel, BoardIPFSModel, BoardCreateEvent, TAGS_LIST, TAG_AREAS_LIST, TAG_CATEGORIES_LIST } from 'src/models'
import { filterArrayByIndexMask } from 'src/utils'
import AbstractContractDAO from './AbstractContractDAO'

export default class BoardControllerDAO extends AbstractContractDAO {
  constructor (address, abi) {
    super(address, abi)
  }

  async connect (web3, options) {
    if (this.isConnected) {
      this.disconnect()
    }
    // eslint-disable-next-line no-console
    console.log('[BoardControllerDAO] Connect')
    this.contract = new web3.eth.Contract(this.abi.abi, this.address, options)

    this.boardCreatedEmitter = this.contract.events.BoardCreated({})
      .on('data', this.handleBoardCreatedData.bind(this))
      .on('error', this.handleError.bind(this))
    this.boardClosedEmitter = this.contract.events.BoardClosed({})
      .on('data', this.handleBoardClosedData.bind(this))
      .on('error', this.handleError.bind(this))

    return this.token
  }

  disconnect () {
    if (this.isConnected) {
      this.boardCreatedEmitter.removeAllListeners()
      this.boardClosedEmitter.removeAllListeners()
      this.boardCreatedEmitter = null
      this.boardClosedEmitter = null
      this.contract = null
    }
  }

  get isConnected () {
    return this.contract != null // nil check
  }

  async getBoards (address, fromId = 1, limit = 10) {
    const boards = []
    // TODO @ipavlenko: We have to ignore address property and load all the boards for awhile
    const response = await this.contract.methods.getBoards(fromId, limit, null).call()
    // eslint-disable-next-line
    console.log('[BoardControllerDAO] getBoards:', response)
    const {
      ids,
      // eslint-disable-next-line no-unused-vars
      name,
      // eslint-disable-next-line no-unused-vars
      boardDescription,
      tags,
      tagsAreas,
      tagsCategories,
      status,
      // ipfsHash,
    } = response
    for (let i = 0; i < ids.length; i++) {
      boards.push(new BoardModel({
        id: Number(ids[i]),
        tags: filterArrayByIndexMask(TAGS_LIST, tags[i]),
        tagsAreas: filterArrayByIndexMask(TAG_AREAS_LIST, tagsAreas[i]),
        tagsCategories: filterArrayByIndexMask(TAG_CATEGORIES_LIST, tagsCategories[i]),
        status: status[i],
        ipfs: new BoardIPFSModel({
          // ...await ipfsService.get(ipfsHash[i]),
          // hash: ipfsHash[i],
        }),
      }))
    }
    return boards
  }

  createCreateBoardTx (sender, name, description, tags = [], tagsAreas = [], tagsCategories = []) {
    const data = this.contract.methods.createBoard(name, description, tags, tagsAreas, tagsCategories).encodeABI()
    return {
      from: sender,
      to: this.contract.address,
      data,
    }
  }

  handleBoardCreatedData (data) {
    // eslint-disable-next-line no-console
    console.log('[BoardControllerDAO] BoardCreated', data)
    const { returnValues } = data
    setImmediate(() => {
      this.emit('BoardCreated', {
        data,
        board: new BoardCreateEvent({
          key: `${data.transactionHash}/${data.logIndex}`,
          self: returnValues.self,
          boardId: returnValues.boardId,
          name: returnValues.name,
          description: returnValues.boardDescription,
          creator: returnValues.creator,
          tags: returnValues.boardTags,
          tagsArea: returnValues.boardTagsArea,
          tagsCategory: returnValues.boardTagsCategory,
          status: returnValues.status,
        }),
      })
    })
  }

  handleBoardClosedData (data) {
    // eslint-disable-next-line no-console
    console.log('[BoardControllerDAO] BoardClosed', data)
  }

  handleError (error) {
    // eslint-disable-next-line no-console
    console.error('[BoardControllerDAO] Error in subscription', error)
  }
}
