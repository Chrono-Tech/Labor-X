// import BigNumber from 'bignumber.js'
import { BoardModel, BoardCreateEvent, TagCategoryModel } from 'src/models'
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

  async getBoards (address, offset = 0, limit = 10) {
    // const boards = []
    // const [
    //   idx,
    //   // name,
    //   // boardDescription,
    //   // tags,
    //   // tagsArea,
    //   // tagsCategory
    // ] = await this.contract.methods.getBoards(offset, limit, address).call()
    // for (let i = 0; i < idx.length; i++) {
    //   boards.push(new BoardModel({
    //     id: idx[0],
    //   }))
    // }
    // return boards
    return [
      new BoardModel({
        id: 0,
        name: 'Become Involved',
        logoSrc: '/static/images/become-full.jpg',
        categories: [
          new TagCategoryModel({ index: 0, name: 'Building' }),
          new TagCategoryModel({ index: 1, name: 'Industrial' }),
        ],
        rating: 5,
        validationLevel: 4,
        status: BoardModel.STATUS.UNASSIGNED,
        jobsCounts: 30,
        clientsCounts: 50,
      }),

      new BoardModel({
        id: 1,
        name: 'Hays Recruiting Experts Worldwide',
        logoSrc: '/static/images/become-full.jpg',
        categories: [
          new TagCategoryModel({ index: 0, name: 'Cleaning' }),
        ],
        rating: 4,
        validationLevel: 3,
        status: BoardModel.STATUS.NEED_VERIFY,
        jobsCounts: 20,
        clientsCounts: 10,
      }),

      new BoardModel({
        id: 2,
        name: 'Australian Recruiting Group',
        logoSrc: '/static/images/become-full.jpg',
        categories: [
          new TagCategoryModel({ index: 0, name: 'Cleaning' }),
        ],
        rating: 3,
        validationLevel: 3,
        status: BoardModel.STATUS.JOINED,
        jobsCounts: 230,
        clientsCounts: 150,
      }),

      new BoardModel({
        id: 3,
        name: 'Hudson',
        logoSrc: '/static/images/become-full.jpg',
        categories: [
          new TagCategoryModel({ index: 0, name: 'Cleaning' }),
        ],
        rating: 2,
        validationLevel: 0,
        status: BoardModel.STATUS.ON_APPROVAL,
        jobsCounts: 230,
        clientsCounts: 150,
      }),
    ]
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
