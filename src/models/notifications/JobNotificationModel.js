// @flow
import NotificationModel from './NotificationModel'

const JOB_NOTIFICATION_EVENT = {
  JobPosted: 'JobPosted',
  JobOfferPosted: 'JobOfferPosted',
  JobOfferAccepted: 'JobOfferAccepted',
  StartWorkRequested: 'StartWorkRequested',
  WorkStarted: 'WorkStarted',
  WorkPaused: 'WorkPaused',
  WorkResumed: 'WorkResumed',
  TimeAdded: 'TimeAdded',
  EndWorkRequested: 'EndWorkRequested',
  WorkFinished: 'WorkFinished',
  JobCanceled: 'JobCanceled',
  WorkAccepted: 'WorkAccepted',
  WorkRejected: 'WorkRejected',
  WorkDistputeResolved: 'WorkDistputeResolved',
  PaymentReleased: 'PaymentReleased',
}

type Event = $Keys<typeof JOB_NOTIFICATION_EVENT>

export default class JobNotificationModel extends NotificationModel {

  id: number;
  event: Event

  constructor (jobNotification: JobNotificationModel) {
    super(jobNotification)
    Object.assign(this, jobNotification)
  }

}
