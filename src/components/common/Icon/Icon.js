import PropTypes from 'prop-types'
import React from 'react'
import css from './Icon.scss'

export default class Icon extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
    clickable: PropTypes.bool,
    className: PropTypes.string,
    faded: PropTypes.bool,
  }

  static NAMES = {
    WALLET: 'account_balance_wallet',
    SETTINGS: 'settings',
    ACCOUNT: 'account_circle', // TODO @dkchv: set actual
    LOGO: 'grade', // TODO @dkchv: set actual
  }

  static COLORS = {
    WARN: 'warn',
    BLACK: 'black',
    RED: 'red',
    BLUE: 'blue',
    GREEN: 'green',
  }

  static SETS = {
    SHIELD_SUCCESS: {
      name: 'check_box', // TODO @dkchv: set actual
      color: Icon.COLORS.GREEN,
    },
    SHIELD_ERROR: {
      name: 'check_box_outline_blank', // TODO @dkchv: set actual
      color: Icon.COLORS.RED,
    },
    MESSAGE_ERROR: {
      name: 'sms_failed', // TODO @dkchv: set actual
      color: Icon.COLORS.RED,
    },
    HELP: {
      name: 'help_outline', // TODO @dkchv: set actual
      color: Icon.COLORS.BLUE,
    },
  }

  render () {
    const classnames = [ 'material-icons' ]
    this.props.className && classnames.push(this.props.className)
    this.props.color && classnames.push(css[ this.props.color ])
    this.props.clickable !== false && classnames.push(css.clickable)
    this.props.faded && classnames.push(css.faded)

    return <i className={classnames.join(' ')}>{this.props.name}</i>
  }
}
