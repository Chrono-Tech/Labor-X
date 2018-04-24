import PropTypes from 'prop-types'
import React from 'react'
import css from './Image.scss'

export default class Image extends React.PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    color: PropTypes.string,
    clickable: PropTypes.bool,
    className: PropTypes.string,
    faded: PropTypes.bool,
    href: PropTypes.string,
    onClick: PropTypes.func,
  }

  static ICONS = {
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
    CHECKBOX_CIRCLE: 'check_box_outline_blank', //TODO set actual
  }

  static COLORS = {
    BLACK: 'black',
    WHITE: 'white',
    RED: 'red',
    BLUE: 'blue',
    GREEN: 'green',
    GOLD: 'gold',

    ERROR: 'error',
    WARN: 'warn',
  }

  static SETS = {
    SHIELD_SUCCESS: {
      icon: 'security', // TODO @dkchv: set actual
      color: Image.COLORS.GREEN,
    },
    SHIELD_ERROR: {
      icon: 'check_box_outline_blank', // TODO @dkchv: set actual
      color: Image.COLORS.RED,
    },
    MESSAGE_ERROR: {
      icon: 'sms_failed', // TODO @dkchv: set actual
      color: Image.COLORS.RED,
    },
    HELP: {
      icon: 'help', // TODO @dkchv: set actual
      color: Image.COLORS.BLUE,
    },
    HELP_INVERT: {
      icon: 'help_outline', // TODO @dkchv: set actual
      color: Image.COLORS.WHITE,
    },
    STAR: {
      icon: Image.ICONS.STAR,
      color: Image.COLORS.GOLD,
    },
  }

  handleClick = () => this.props.onClick && this.props.onClick()

  render () {
    let classnames = ['root']
    this.props.className && classnames.push(this.props.className)

    if (this.props.href) {
      // external image
      return (
        <img
          src={this.props.href}
          className={classnames}
          onClick={this.handleClick}
        />
      )
    }

    // specific material icons
    classnames.push('material-icons')
    this.props.color && classnames.push(css[ this.props.color ])
    this.props.clickable !== false && classnames.push(css.clickable)
    this.props.faded && classnames.push(css.faded)

    return (
      <i
        className={classnames.join(' ')}
        onClick={this.handleClick}
      >
        {this.props.icon}
      </i>
    )
  }
}
