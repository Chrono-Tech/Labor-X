// @flow
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import AbstractModel from '../AbstractModel'

export const NOTIFICATION_STATE = {
  REQUEST: 'REQUEST',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

export type State = $Keys<typeof NOTIFICATION_STATE>

const schemaFactory = () => ({
  notificationId: PropTypes.string,
  title: PropTypes.string,
  descr: PropTypes.string,
  icon: PropTypes.string,
  state: PropTypes.oneOf(Object.keys(NOTIFICATION_STATE)),
})

export default class NotificationModel extends AbstractModel {

  notificationId: string;
  title: string;
  descr: string;
  icon: string;
  state: State;

  constructor (notification: NotificationModel){
    super(withDefaults(notification), schemaFactory())
    Object.assign(this, withDefaults(notification))
    Object.freeze(this)
  }

  get id () {
    return `${this.constructor.name}-${this.notificationId}`
  }
}

function withDefaults (props) {
  return Object.assign({}, {
    notificationId: uniqid(),
  }, props)
}
