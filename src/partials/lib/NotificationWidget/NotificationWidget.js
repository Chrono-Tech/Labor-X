import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { connect } from 'react-redux'
import { JobNotificationModel, BoardNotificationModel } from 'src/models'
import { Icon, Link } from 'src/components/common'
import css from './NotificationWidget.scss'

class NotificationWidget extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    jobNotifications: PropTypes.arrayOf(PropTypes.instanceOf(JobNotificationModel)),
    boardNotifications: PropTypes.arrayOf(PropTypes.instanceOf(BoardNotificationModel)),
  }

  handleDismissAll = () => {
    // eslint-disable-next-line no-console
    console.log('NotificationWidget-handleDismissAll')
  }

  handleClickBell = () => {
    // eslint-disable-next-line no-console
    console.log('NotificationWidget-handleClickBell')
  }

  render () {
    const { className, jobNotifications, boardNotifications } = this.props
    return (
      <div className={cn(css.root, className)}>
        <Icon
          size={30}
          icon={Icon.ICONS.NOTIFICATIONS}
          color={Icon.COLORS.WHITE}
          onClick={this.handleClickBell}
        />
      </div>
    )
  }
}

const mapStateToProps = () => ({
  // TODO @aevalyakin get notifications from store
  jobNotifications: [
    new JobNotificationModel({
      jobId: 1,
      event: 'JobPosted',
      title: 'Install 10 Gas ovens',
      descr: 'Job has been published',
      state: 'SUCCESS',
    }),
    new JobNotificationModel({
      jobId: 1,
      event: 'JobPosted',
      title: 'Install 10 Gas ovens',
      descr: 'Publishing job',
      state: 'REQUEST',
    }),
    new JobNotificationModel({
      jobId: 1,
      event: 'JobPosted',
      title: 'Install 10 Gas ovens',
      descr: 'Job can not be published',
      state: 'FAILURE',
    }),
  ],
  boardNotifications: [
    new BoardNotificationModel({
      boardId: 1,
      event: 'BoardCreated',
      title: 'Become Involved',
      descr: 'Board has been published',
      state: 'SUCCESS',
    }),
    new BoardNotificationModel({
      boardId: 1,
      event: 'BoardCreated',
      title: 'Become Involved',
      descr: 'Board is being published',
      state: 'REQUEST',
    }),
    new BoardNotificationModel({
      boardId: 1,
      event: 'BoardCreated',
      title: 'Become Involved',
      descr: 'Board can not be published',
      state: 'FAILURE',
    }),
  ],
})

// const mapDispatchToProps = (dispatch) => ({
// })

export default connect(mapStateToProps, null)(NotificationWidget)
