import PropTypes from 'prop-types'
import React from 'react'
import css from './Image.scss'

export default class Image extends React.PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    color: PropTypes.string,
    clickable: PropTypes.bool,
    className: PropTypes.string,
    faded: PropTypes.bool,
    href: PropTypes.string,
    onClick: PropTypes.func,
  }

  static ICONS = {
    EMAIL: 'email',
    NOTIFICATIONS: 'notifications',
    WALLET: 'account_balance_wallet',
    SETTINGS: 'settings',
    STAR: 'star_rate',
    ACCOUNT: 'account_circle', // TODO @dkchv: set actual
    LOGO: 'grade', // TODO @dkchv: set actual
    UPLOAD_FILE_SELECT: 'file_upload',
    UPLOAD_FILE_UPLOADING: 'cached',
    UPLOAD_FILE_SUCCESS: 'check_circle',
    UPLOAD_FILE_ERROR: 'error',
    UPLOAD_FILE_REMOVE: 'delete',
    CHECKBOX_ON: 'check_box',
    CHECKBOX_OFF: 'check_box_outline_blank',
    CHECKBOX_CIRCLE: 'check_circle',
    LH_LIGHT: 'star_rate', // TODO actual
    ARROW_BACK: 'arrow_back',
    SEARCH: 'search',
    FILTER: 'filter_list',
    CALENDAR: 'calendar_today',
    ERROR: 'error',
    HELP: 'help',
    HELP_OUTLINE: 'help_outline',
    SECURITY: 'security',
    MESSAGE: 'message',
    PLAY: 'play_arrow',
    PAUSE: 'pause',
  }

  static COLORS = {
    BLACK: 'black',
    WHITE: 'white',
    RED: 'red',
    BLUE: 'blue',
    GREEN: 'green',
    GOLD: 'gold',
    GREY: 'grey',
    GREY30: 'grey30',

    ERROR: 'error',
    WARN: 'warn',
  }

  static SETS = {
    SHIELD_SUCCESS: {
      icon: Image.ICONS.SECURITY, // TODO @dkchv: set actual
      color: Image.COLORS.GREEN,
    },
    SHIELD_ERROR: {
      icon: Image.ICONS.SECURITY, // TODO @dkchv: set actual
      color: Image.COLORS.RED,
    },
    MESSAGE_ERROR: {
      icon: Image.ICONS.MESSAGE_ERROR, // TODO @dkchv: set actual
      color: Image.COLORS.RED,
    },
    HELP: {
      icon: Image.ICONS.HELP, // TODO @dkchv: set actual
      color: Image.COLORS.BLUE,
    },
    HELP_INVERT: {
      icon: Image.ICONS.HELP_OUTLINE, // TODO @dkchv: set actual
      color: Image.COLORS.WHITE,
    },
    STAR: {
      icon: Image.ICONS.STAR,
      color: Image.COLORS.GOLD,
    },
    NOTIFICATIONS_ON: {
      icon: Image.ICONS.NOTIFICATIONS,
      color: Image.COLORS.BLUE,
    },
    NOTIFICATIONS_OFF: {
      icon: Image.ICONS.NOTIFICATIONS,
      color: Image.COLORS.GREY,
    },
    EMAIL_ON: {
      icon: Image.ICONS.EMAIL,
      color: Image.COLORS.BLUE,
    },
    EMAIL_OFF: {
      icon: Image.ICONS.EMAIL,
      color: Image.COLORS.GREY,
    },
    CIRCLE_CHECKBOX_OFF: {
      icon: Image.ICONS.CHECKBOX_CIRCLE,
      color: Image.COLORS.GREY,
    },
    CIRCLE_CHECKBOX_ON: {
      icon: Image.ICONS.CHECKBOX_CIRCLE,
      color: Image.COLORS.BLUE,
    },
    LH_LIGHT: {
      icon: Image.ICONS.LH_LIGHT,
      color: Image.COLORS.WHITE,
    },
    ARROW_BACK: {
      icon: Image.ICONS.ARROW_BACK,
      color: Image.COLORS.WHITE,
    },
  }

  handleClick = () => this.props.onClick && this.props.onClick()

  render () {
    let classnames = ['root']
    this.props.className && classnames.push(this.props.className)

    if (this.props.href) {
      // external image
      return (
        <div
          onClick={this.handleClick}
          onKeyPress={this.handleClick}
          tabIndex={0}
          role='button'
        >
          <img
            className={classnames}
            src={this.props.href}
            alt=''
          />
        </div>
      )
    }

    // specific material icons
    classnames.push('material-icons')
    this.props.color && classnames.push(css[ this.props.color ])
    this.props.clickable !== false && classnames.push(css.clickable)
    this.props.faded && classnames.push(css.faded)

    return (
      <i
        title={this.props.title}
        className={classnames.join(' ')}
        onClick={this.handleClick}
        onKeyPress={this.handleClick}
        role='button'
        tabIndex={0}
      >
        {this.props.icon}
      </i>
    )
  }
}
