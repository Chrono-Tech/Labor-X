import PropTypes from 'prop-types'
import React from 'react'
import css from './Icon.scss'

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
    SECURITY_CHECK: 'F01A',
    SECURITY: 'F01C',
    FILTER: 'F04E',
    SECURITY_UPGRADE: 'F04E',
    MESSAGE_WARNING: 'F073',
    DROP_1: 'F062',
    PHONE_EMAIL: 'F079',
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
  }
  
  handleClick = () => this.props.onClick && this.props.onClick()
  
  render () {
    const { className, color, clickable, faded, icon } = this.props
    let classnames = [css.root]
    className && classnames.push(className)
    
    // specific material icons
    color && classnames.push(css[ color ])
    clickable !== false && classnames.push(css.clickable)
    faded && classnames.push(css.faded)
    
    const formattedIcon = `&#x${icon};`
    
    return (
      <i
        className={classnames.join(' ')}
        onClick={this.handleClick}
        onKeyPress={this.handleClick}
        tabIndex={0}
        dangerouslySetInnerHTML={{__html: formattedIcon}}
      />
    )
  }
}
