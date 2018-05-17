import PropTypes from 'prop-types'
import React from 'react'
import css from './Icon.scss'

export default class Image extends React.PureComponent {
  static propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    color: PropTypes.string,
    className: PropTypes.string,
    faded: PropTypes.bool,
    href: PropTypes.string,
  }
  
  static ICONS = {
    SECURITY: 'security',
    SECURITY_CHECK: 'security-check',
    SECURITY_SHIELD: 'security-shield',
    FILTER: 'filter',
    SECURITY_UPGRADE: 'security-upgrade',
    MESSAGE_WARNING: 'message-warning',
    DROP_1: 'drop-1',
    PHONE_EMAIL: 'phone-email',
    UPLOAD: 'upload',
    HOME: 'home',
    FILE: 'file',
    DELETE: 'delete',
    MESSAGE: 'message',
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
    SECURITY: {
      icon: Image.ICONS.SECURITY,
      color: Image.COLORS.GREEN,
    },
    SECURITY_CHECK: {
      icon: Image.ICONS.SECURITY_CHECK,
      color: Image.COLORS.GREEN,
    },
    SECURITY_SHIELD: {
      icon: Image.ICONS.SECURITY_SHIELD,
      color: Image.COLORS.RED,
    },
  }
  
  render () {
    const { className, color, faded, icon } = this.props
    let classnames = [css.root]
    className && classnames.push(className)
    
    // specific material icons
    color && classnames.push(css[ color ])
    faded && classnames.push(css.faded)
    icon && css[`icon-${icon}`] && classnames.push(css[ `icon-${icon}` ])
    
    return (
      <i
        className={classnames.join(' ')}
      />
    )
  }
}
