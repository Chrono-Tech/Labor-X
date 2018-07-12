// @flow
export const NOTIFICATION_STATE = {
  REQUEST: 'REQUEST',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

export type State = $Keys<typeof NOTIFICATION_STATE>

export default class Notification {

  state: State;
  title: string;
  descr: string;

  constructor (notification: Notification){
    Object.assign(this, notification)
  }
}
