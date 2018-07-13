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
  state: PropTypes.oneOf(Object.keys(NOTIFICATION_STATE)),
})

export default class Notification extends AbstractModel {

  state: State;
  title: string;
  descr: string;

  constructor (notification: Notification){
    super(notification, schemaFactory())
    Object.assign(this, notification)
    Object.freeze(this)
  }
}
