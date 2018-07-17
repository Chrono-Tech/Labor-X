// @flow
import { BoardModel, BoardExtraModel, BoardCreatedEvent, BoardClosedEvent, UserBindedEvent } from 'src/models'
import { storeIntoIPFS } from 'src/utils'
import { daoByType } from '../daos/selectors'
import { signerSelector } from '../wallet/selectors'
import { boardByIdSelector } from './selectors'
import { executeTransaction } from '../ethereum/actions'
import { web3Selector } from '../ethereum/selectors'

export const BOARDS_CLEAR = 'boards/clear'
export const BOARDS_SAVE = 'boards/save'
export const BOARDS_FILTER = 'boards/filter'
export const BOARD_CREATE= 'boards/create'

export const initBoards = () => async (dispatch, getState) => {
  const state = getState()
  daoByType('BoardController')(state)
    .on('BoardCreated', ({ event }) => dispatch(handleBoardCreated(event)))
    .on('BoardClosed', ({ event }) => dispatch(handleBoardClosed(event)))
    .on('UserBinded', ({ event }) => dispatch(handleUserBinded(event)))
  await dispatch(reloadBoards())
}

export const reloadBoards = () => async (dispatch, getState) => {
  const state = getState()
  const boardControlerDAO = daoByType('BoardController')(state)
  const signer = signerSelector()(state)
  dispatch({
    type: BOARDS_CLEAR,
  })
  if (signer) {
    const boards = await boardControlerDAO.getBoards(signer.address)
    dispatch({
      type: BOARDS_SAVE,
      boards,
    })
  }
}

export const joinBoard = (boardId) => async (dispatch, getState) => {
  const state = getState()
  const boardControlerDAO = daoByType('BoardController')(state)
  const signer = signerSelector()(state)
  const web3 = web3Selector()(state)
  const tx = boardControlerDAO.createJoinBoardTx(signer.address, boardId)
  await dispatch(executeTransaction({ tx, web3 }))
}

export const terminateBoard = (boardId) => async (dispatch, getState) => {
  const state = getState()
  const boardControlerDAO = daoByType('BoardController')(state)
  const signer = signerSelector()(state)
  const web3 = web3Selector()(state)
  const tx = boardControlerDAO.createTerminateBoardTx(signer.address, boardId)
  await dispatch(executeTransaction({ tx, web3 }))
}

export const handleBoardCreated = (e: BoardCreatedEvent) => async (dispatch, getState): BoardModel => {
  const state = getState()
  const boardControlerDAO = daoByType('BoardController')(state)
  const signer = signerSelector()(state)
  const board = await boardControlerDAO.getBoardById(signer.address, e.boardId)
  dispatch({
    type: BOARDS_SAVE,
    boards: [ board ],
  })
  return board
}

export const handleBoardClosed = (e: BoardClosedEvent) => async (dispatch, getState) => {
  const state = getState()
  const board = boardByIdSelector(e.boardId)(state)
  dispatch({
    type: BOARDS_SAVE,
    boards: [
      new BoardModel({
        ...board,
        isActive: false,
      }),
    ],
  })
}

export const handleUserBinded = (e: UserBindedEvent) => async (dispatch, getState) => {
  const state = getState()
  const signer = signerSelector()(state)
  const board = boardByIdSelector(e.boardId)(state)
  dispatch({
    type: BOARDS_SAVE,
    boards: [
      new BoardModel({
        ...board,
        extra: new BoardExtraModel({
          ...board.extra,
          clientsCount: board.extra.clientsCount + 1,
          isSignerJoined: signer.address.toLowerCase() === e.user.toLowerCase()
            ? e.status
            : board.extra.isSignerJoined,
        }),
      }),
    ],
  })
}

export const updateFilterBoards = (filterFields) => (dispatch, getState) => {
  const state = getState()

  const { list } = state.boards

  let { rating, categories, level, searchText } = filterFields
  let currentList = [...list] || []

  if (categories) {
    categories = Object.keys(categories).filter((item) => !!categories[item])

    currentList = currentList.filter(
      (board) => categories.every(
        (item) => board.categories.find(
          (tag) => String(tag.name).toLowerCase() === String(item).toLowerCase()
        )
      )
    )
  }

  if (level && !isNaN(parseInt(level))) {
    level = parseInt(level)

    currentList = currentList.filter((board) => board.ipfs.validationLevel >= level)
  }

  if (rating && !isNaN(parseInt(rating))) {
    rating = parseInt(rating)

    currentList = currentList.filter((board) => board.ipfs.rating >= rating)
  }

  if (searchText){
    searchText = String(searchText).toLowerCase()
    currentList = currentList.filter((board) => String(board.ipfs.name || '').toLowerCase().includes(searchText) )
  }

  dispatch({
    type: BOARDS_FILTER,
    boardsList: currentList,
  })
}

export const boardCreate = (data) => async (dispatch, getState) => {
  const state = getState()

  const boardControlerDAO = daoByType('BoardController')(state)
  const signer = signerSelector()(state)
  const web3 = web3Selector()(state)

  const detailsIPFSHash = await storeIntoIPFS(data.ipfsData)
  debugger
  const tx = boardControlerDAO.createCreateBoardTx(
    signer.address,
    data.tagsBitmask,
    data.areasBitmask,
    data.categoriesBitmask,
    detailsIPFSHash
  )

  await dispatch(executeTransaction({ tx, web3, signer }))
}
