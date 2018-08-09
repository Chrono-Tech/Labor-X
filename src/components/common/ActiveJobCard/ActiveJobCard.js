import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import { JobModel, BoardModel, ProfileModel, JobNoticeModel, JOB_STATE_PENDING_START/*, NOTICE_TYPE_PROBLEM, NOTICE_TYPE_MESSAGE */ } from 'src/models'
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import Divider from "@material-ui/core/Divider"
import Avatar from "@material-ui/core/Avatar"

import css from './ActiveJobCard.scss'
import { confirmStartWork, modalsPush } from "../../../store"
import { JOB_STATE_PENDING_FINISH } from "../../../models"
import PayInvoiceDialog from "../../../partials/lib/PayInvoiceDialog/PayInvoiceDialog"
import PersonModel from "../../../api/backend/model/PersonModel"

const dateFormat = 'h:mm A'
const DEFAULT_AVATAR = "/static/images/profile-photo.jpg"

class ActiveJobCard extends React.Component {
  static propTypes = {
    job: PropTypes.instanceOf(JobModel).isRequired,
    board: PropTypes.instanceOf(BoardModel),
    notice: PropTypes.instanceOf(JobNoticeModel),
    workerPerson: PropTypes.instanceOf(PersonModel),
    recruiter: PropTypes.instanceOf(ProfileModel),
    onClickReview: PropTypes.func,
    confirmStartWork: PropTypes.func,
    openPayInvoiceDialog: PropTypes.func,
    lhtUsdPrice: PropTypes.number,
  }

  constructor (...args) {
    super(...args)
    this.handleReview = this.handleReview.bind(this)
  }

  handleReview () {
    this.props.onClickReview(this.props.job, this.props.workerPerson.address)
  }

  handleMessage () {
    // eslint-disable-next-line no-console
    console.log('ActionJobCard-handleMessage')
  }

  handleConfirmStartWork = () => {
    this.props.confirmStartWork()
  }

  handleReviewInvoiceClick = () => {
    this.props.openPayInvoiceDialog()
  }

  render () {
    const { job, workerPerson, lhtUsdPrice } = this.props
    return (
      <Card className={css.card}>
        <CardHeader
          className={css.cardTop}
          classes={{
            action: css.cardHeaderAction,
          }}
          action={
            <div className={css.jobAwardRow}>
              <p>LHT {job.ipfs.budget.hourlyRate} / {job.ipfs.budget.totalHours}</p>
              <p>${(job.ipfs.budget.hourlyRate * lhtUsdPrice).toFixed(2)} / ${(job.ipfs.budget.totalHours * lhtUsdPrice).toFixed(2)}</p>
            </div>
          }
          subheader={
            <div>
              <div className={css.jobStartTimeBlock}>{moment(job.extra.startedAt).format(dateFormat)}</div>
              <div className={css.cardName}>{job.ipfs.name}</div>
            </div>
          }
        />
        <Divider />
        <CardHeader
          className={css.cardBottom}
          classes={{
            action: css.cardHeaderAction,
          }}
          avatar={
            <Avatar aria-label='Recipe' className={css.avatar}>
              <div
                className={css.avatarImg}
                style={{ "background": `url(${workerPerson.avatar || DEFAULT_AVATAR}) no-repeat center/cover` }}
              />
            </Avatar>
          }
          action={
            <div>
              {
                job.state === JOB_STATE_PENDING_FINISH && (
                  <div className={css.actionBtn} onClick={this.handleReviewInvoiceClick}>REVIEW INVOICE</div>
                )
              }
              {
                job.state === JOB_STATE_PENDING_START && (
                  <div className={css.actionBtn} onClick={this.handleConfirmStartWork}>CONFIRM START</div>
                )
              }
            </div>
          }
          title={
            <div className={css.workerName}> {workerPerson.userName} </div>
          }
        />
      </Card>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  confirmStartWork: () => dispatch(confirmStartWork(ownProps.job.id)),
  openPayInvoiceDialog: () => dispatch(modalsPush({ component: PayInvoiceDialog, props: { job: ownProps.job, worker: new ProfileModel({}) } })),
})

export default connect(null, mapDispatchToProps)(ActiveJobCard)
