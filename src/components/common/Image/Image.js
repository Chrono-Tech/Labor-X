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
  }

  static ICONS = {
    WALLET: 'account_balance_wallet',
    SETTINGS: 'settings',
    STAR: 'star_rate',
    ACCOUNT: 'account_circle', // TODO @dkchv: set actual
    LOGO: 'grade', // TODO @dkchv: set actual
  }

  static COLORS = {
    WARN: 'warn',
    BLACK: 'black',
    RED: 'red',
    BLUE: 'blue',
    GREEN: 'green',
    GOLD: 'gold',
  }

  static SETS = {
    SHIELD_SUCCESS: {
      icon: 'check_box', // TODO @dkchv: set actual
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
      icon: 'help_outline', // TODO @dkchv: set actual
      color: Image.COLORS.BLUE,
    },
    STAR: {
      icon: Image.ICONS.STAR,
      color: Image.COLORS.GOLD,
    },
  }

  render () {
    let classnames

    if (this.props.href) {
      // external image
      classnames = this.props.className
      return <img src={this.props.href} className={classnames} />
    }

    // specific material icons
    classnames = [ 'material-icons' ]
    this.props.className && classnames.push(this.props.className)
    this.props.color && classnames.push(css[ this.props.color ])
    this.props.clickable !== false && classnames.push(css.clickable)
    this.props.faded && classnames.push(css.faded)

    return <i className={classnames.join(' ')}>{this.props.icon}</i>
  }
}
