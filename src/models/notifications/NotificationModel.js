// @flow
import PropTypes from 'prop-types'
import AbstractModel from '../AbstractModel'

export const NOTIFICATION_STATE = {
  REQUEST: 'REQUEST',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

export type State = $Keys<typeof NOTIFICATION_STATE>

const schemaFactory = () => ({
  title: PropTypes.string,
  descr: PropTypes.string,
  icon: PropTypes.string,
  state: PropTypes.oneOf(Object.keys(NOTIFICATION_STATE)),
})

export default class NotificationModel extends AbstractModel {

  state: State;
  title: string;
  descr: string;
  icon: string;

  constructor (notification: NotificationModel){
    super(notification, schemaFactory())
    Object.assign(this, notification)
    Object.freeze(this)
  }
}
