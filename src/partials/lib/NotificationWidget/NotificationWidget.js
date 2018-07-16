// @flow
import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import uniqid from 'uniqid'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux'
import { NotificationModel, JobNotificationModel, BoardNotificationModel, NOTIFICATION_STATE } from 'src/models'
import { jobByIdSelector } from 'src/store'
import { Icon } from 'src/components/common'
import css from './NotificationWidget.scss'

class NotificationWidget extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    notifications: PropTypes.arrayOf(PropTypes.instanceOf(NotificationModel)),
  }

  constructor (props){
    super(props)
    this.state = {
      anchorEl: null,
    }
  }

  handleDismissAll = () => {
    // eslint-disable-next-line no-console
    console.log('NotificationWidget-handleDismissAll')
  }

  handleClickEntry = () => {
    // eslint-disable-next-line no-console
    console.log('NotificationWidget-handleClickEntry')
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleClickBell = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  renderDropdown = (notifications) => {
    return (
      <Menu
        id='notification-dropdown'
        anchorEl={this.state.anchorEl}
        open={Boolean(this.state.anchorEl)}
        onClose={this.handleClose}
      >
        {
          notifications.length > 0
            ? notifications.map(this.renderMenuEntry)
            : <MenuItem><p>No notifications</p></MenuItem>
        }
        <MenuItem
          className={css.closeButton}
          onClick={this.handleDismissAll}
        >
          <Icon
            size={18}
            icon={Icon.ICONS.CLOSE}
          />
        </MenuItem>
      </Menu>
    )
  }

  renderMenuEntry = (notification: NotificationModel) => (
    <MenuItem
      key={uniqid()}
      className={css.menuEntry}
      onClick={this.handleClickEntry}
    >
      <ListItemIcon className={css.entryIcon}>
        <div className={css.iconContainer}>
          {
            notification.state === NOTIFICATION_STATE.SUCCESS
              ? <Icon className={css.icon} size={40} icon={Icon.ICONS.CHECK_CIRCLE} color={Icon.COLORS.GREEN} />
              : notification.state === NOTIFICATION_STATE.FAILURE
                ? <Icon className={css.icon} size={40} icon={Icon.ICONS.CANCEL} color={Icon.COLORS.RED} />
                : (
                  <div className={css.iconWithProgress}>
                    <img className={css.icon} src={notification.icon ? notification.icon : '/static/images/default_logo.png'} alt='logo' />
                    <CircularProgress className={css.entryProgress} style={{ color: '#e6e6e6' }} size={40} />
                  </div>
                )
          }
        </div>
      </ListItemIcon>
      <ListItemText css={css.entryText}>
        <p className={css.title}>{notification.title}</p>
        <p className={css.descr}>{notification.descr}</p>
      </ListItemText>
    </MenuItem>
  )

  render () {
    const { className, notifications } = this.props
    return (
      <div className={cn(css.root, className)}>
        <div className={css.menu}>
          { notifications.find(n => n.state === NOTIFICATION_STATE.REQUEST)
            ? (<CircularProgress
              className={css.progress}
              style={{ color: 'white' }}
              size={50}
            />)
            : null
          }
          <Icon
            className={css.bellIcon}
            size={30}
            icon={Icon.ICONS.NOTIFICATIONS}
            color={Icon.COLORS.WHITE}
            onClick={this.handleClickBell}
          />
        </div>
        { this.renderDropdown(notifications) }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  // TODO @aevalyakin get notifications from store
  notifications: [
    new JobNotificationModel({
      jobId: 1,
      event: 'JobPosted',
      title: 'Install 10 Gas ovens',
      descr: 'Job has been published',
      state: 'SUCCESS',
      icon: jobByIdSelector(1)(state) ? jobByIdSelector(1)(state).ipfs.logo : null,
    }),
    new JobNotificationModel({
      jobId: 1,
      event: 'JobPosted',
      title: 'Install 10 Gas ovens',
      descr: 'Publishing job',
      state: 'REQUEST',
      icon: jobByIdSelector(1)(state) ? jobByIdSelector(1)(state).ipfs.logo : null,
    }),
    new JobNotificationModel({
      jobId: 1,
      event: 'JobPosted',
      title: 'Install 10 Gas ovens',
      descr: 'Job can not be published',
      state: 'FAILURE',
      icon: jobByIdSelector(1)(state) ? jobByIdSelector(1)(state).ipfs.logo : null,
    }),
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

export default connect(mapStateToProps, null)(NotificationWidget)
