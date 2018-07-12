// @flow
import NotificationModel from './NotificationModel'

const BOARD_NOTIFICATION_EVENT = {
  BoardCreated: 'BoardCreated',
  JobBinded: 'JobBinded',
  UserBinded: 'UserBinded',
  BoardClosed: 'BoardClosed',
}

type Event = $Keys<typeof BOARD_NOTIFICATION_EVENT>

export default class BoardNotificationModel extends NotificationModel {

  id: number;
  event: Event

  constructor (boardNotification: BoardNotificationModel) {
    super(boardNotification)
    Object.assign(this, boardNotification)
  }
}
