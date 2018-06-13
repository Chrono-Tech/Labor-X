import PropTypes from 'prop-types'
import React from 'react'
import cn from 'classnames'
import css from './Icon.scss'

export default class Image extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.string,
    title: PropTypes.string,
    color: PropTypes.string,
    faded: PropTypes.bool,
    href: PropTypes.string,
    size: PropTypes.number,
  }

  static defaultTypes = {
    icon: '',
    size: 14,
  }

  static ICONS = {
    SECURITY: 'security',
    SECURITY_CHECK: 'security-check',
    SECURITY_SHIELD: 'security-shield',
    SECURITY_NONE: 'security-none',
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
    CLOSE: 'close',
    CHECK: 'check',
    STAR: 'star',
    RATING: 'rating',
    MORE: 'more',
    ADD_CIRCLE: 'add-circle',
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
    SECURITY_NONE: {
      icon: Image.ICONS.SECURITY_NONE,
      color: Image.COLORS.RED,
    },
    CHECK: {
      icon: Image.ICONS.CHECK,
      color: Image.COLORS.WHITE,
    },
    STAR: {
      icon: Image.ICONS.STAR,
      color: Image.COLORS.GOLD,
    },
  }

  render () {
    const { className, color, faded, icon, size, onClick } = this.props
    return (
      <i
        onClick={onClick}
        onKeyPress={onClick}
        tabIndex={0}
        role='button'
        style={size ? { fontSize: size } : null}
        className={cn([
          css.root,
          className,
          faded,
          icon && css[`icon-${icon}`],
          color && css[color],
          onClick && css.clickable,
        ])}
      />
    )
  }
}
