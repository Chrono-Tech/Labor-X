// @flow
import PropTypes from 'prop-types'
import NotificationModel from './NotificationModel'

const BOARD_NOTIFICATION_EVENT = {
  BoardCreated: 'BoardCreated',
  JobBinded: 'JobBinded',
  UserBinded: 'UserBinded',
  BoardClosed: 'BoardClosed',
}

type Event = $Keys<typeof BOARD_NOTIFICATION_EVENT>

const schemaFactory = () => ({
  boardId: PropTypes.number,
  event: PropTypes.oneOf(Object.keys(BOARD_NOTIFICATION_EVENT)),
})

export default class BoardNotificationModel extends NotificationModel {

  boardId: number;
  event: Event

  constructor (boardNotification: BoardNotificationModel){
    super(boardNotification, schemaFactory())
    Object.freeze(this)
  }
}
