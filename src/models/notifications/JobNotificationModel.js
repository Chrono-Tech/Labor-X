// @flow
import PropTypes from 'prop-types'
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

const schemaFactory = () => ({
  jobId: PropTypes.number,
  event: PropTypes.oneOf(Object.keys(JOB_NOTIFICATION_EVENT)),
})

export default class JobNotificationModel extends NotificationModel {

  jobId: number;
  event: Event

  constructor (jobNotification: JobNotificationModel){
    super(jobNotification, schemaFactory())
    Object.freeze(this)
  }
}
