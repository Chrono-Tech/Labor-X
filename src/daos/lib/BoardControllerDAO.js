// import BigNumber from 'bignumber.js'
import { BoardModel, BoardIPFSModel, BoardExtraModel, BoardCreatedEvent, BoardClosedEvent, UserBindedEvent, TAGS_LIST, TAG_AREAS_LIST, TAG_CATEGORIES_LIST } from 'src/models'
import { filterArrayByIndexMask, loadFromIPFS, ipfsHashToBytes32, bytes32ToIPFSHash  } from 'src/utils'
import AbstractContractDAO from './AbstractContractDAO'

export default class BoardControllerDAO extends AbstractContractDAO {
  constructor ({ address, history, abi }) {
    super({ address, history, abi })
  }

  async connect (web3, options) {
    if (this.isConnected) {
      this.disconnect()
    }
    // eslint-disable-next-line no-console
    console.log('[BoardControllerDAO] Connect')
    this.contract = new web3.eth.Contract(this.abi.abi, this.address, options)
    this.history = this.history != null // nil check
      ? new web3.eth.Contract(this.abi.abi, this.history, options)
      : this.contract
    this.boardCreatedEmitter = this.history.events.BoardCreated({})
      .on('data', this.handleBoardCreatedData.bind(this))
      .on('error', this.handleError.bind(this))
    this.boardClosedEmitter = this.history.events.BoardClosed({})
      .on('data', this.handleBoardClosedData.bind(this))
      .on('error', this.handleError.bind(this))
    this.userBindedEmitter = this.history.events.UserBinded({})
      .on('data', this.handleUserBindedData.bind(this))
      .on('error', this.handleError.bind(this))

    return this.token
  }

  disconnect () {
    if (this.isConnected) {
      this.boardCreatedEmitter.removeAllListeners()
      this.boardClosedEmitter.removeAllListeners()
      this.userBindedEmitter.removeAllListeners()
      this.boardCreatedEmitter = null
      this.boardClosedEmitter = null
      this.userBindedEmitter = null
      this.contract = null
      this.history = null
    }
  }

  get isConnected () {
    return this.contract != null // nil check
  }

  async getUserStatus (address, boardId): Promise<Boolean> {
    const res = await this.contract.methods.getUserStatus(boardId, address).call()
    console.log('getUserStatus', res, boardId, address)
    return res
  }

  async getBoardById (signer, id) {
    const [ board ] = await this.getBoards(signer, id, 1)
    return board
  }

  async getBoards (address, fromId = 1/*, limit = 100*/) {
    const boards = []
    const count = await this.contract.methods.getBoardsCount().call()
    // TODO @ipavlenko: We have to ignore address property and load all the boards for awhile
    const response = await this.contract.methods.getBoards(fromId, count, null).call()
    // eslint-disable-next-line
    console.log('[BoardControllerDAO] getBoards:', response)
    const {
      ids,
      // eslint-disable-next-line no-unused-vars
      names,
      descriptions, // contains both description & ipfs hash
      tags,
      tagsAreas,
      tagsCategories,
      status,
      // ipfsHash,
    } = response
    for (let i = 0; i < ids.length; i++) {
      const hash = bytes32ToIPFSHash(descriptions[i * 2 + 1])
      const id = Number(ids[i])
      boards.push(new BoardModel({
        id,
        tags: filterArrayByIndexMask(TAGS_LIST, tags[i]),
        tagsArea: filterArrayByIndexMask(TAG_AREAS_LIST, tagsAreas[i]),
        tagsCategory: filterArrayByIndexMask(TAG_CATEGORIES_LIST, tagsCategories[i]),
        isActive: status[i],
        ipfs: new BoardIPFSModel({
          ...(await loadFromIPFS(hash) || {}),
          hash,
        }),
        extra: new BoardExtraModel({
          isSignerJoined: await this.getUserStatus(address, id),
        }),
      }))
    }

    return boards
  }

  createCreateBoardTx (sender, name, description, tags = [], tagsAreas = [], tagsCategories = []) {
    const data = this.contract.methods.createBoard(name, description, tags, tagsAreas, tagsCategories).encodeABI()
    return {
      from: sender,
      to: this.address,
      data,
    }
  }

  createJoinBoardTx (sender, boardId) {
    const data = this.contract.methods.bindUserWithBoard(boardId, sender).encodeABI()
    return {
      from: sender,
      to: this.address,
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
        event: new BoardCreatedEvent({
          key: `${data.transactionHash}/${data.logIndex}`,
          self: returnValues.self,
          boardId: Number(returnValues.boardId),
          name: returnValues.name,
          description: returnValues.boardDescription,
          creator: returnValues.creator,
          tags: Number(returnValues.boardTags),
          tagsArea: Number(returnValues.boardTagsArea),
          tagsCategory: Number(returnValues.boardTagsCategory),
          boardIpfsHash: returnValues.boardIpfsHash,
          status: returnValues.status,
        }),
      })
    })
  }

  handleUserBindedData (data) {
    // eslint-disable-next-line no-console
    console.log('[BoardControllerDAO] UserBinded', data)
    const { returnValues } = data
    setImmediate(() => {
      this.emit('UserBinded', {
        data,
        event: new UserBindedEvent({
          key: `${data.transactionHash}/${data.logIndex}`,
          self: returnValues.self,
          boardId: Number(returnValues.boardId),
          user: returnValues.user,
          status: returnValues.status,
        }),
      })
    })
  }

  handleBoardClosedData (data) {
    // eslint-disable-next-line no-console
    console.log('[BoardControllerDAO] BoardClosed', data)
    const { returnValues } = data
    setImmediate(() => {
      this.emit('BoardClosed', {
        data,
        event: new BoardClosedEvent({
          key: `${data.transactionHash}/${data.logIndex}`,
          self: returnValues.self,
          boardId: Number(returnValues.boardId),
          status: returnValues.status,
        }),
      })
    })
  }

  handleError (error) {
    // eslint-disable-next-line no-console
    console.error('[BoardControllerDAO] Error in subscription', error)
  }
}
