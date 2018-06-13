import React from 'react'
import PropTypes from 'prop-types'

import css from './Popover.scss'

export default class Popover extends React.Component {
  static ARROW_POSITION = {
    LEFT: 'left',
    CENTER: 'center',
    RIGHT: 'right',
  }

  static propTypes = {
    arrowPosition: PropTypes.oneOf([
      Popover.ARROW_POSITION.LEFT,
      Popover.ARROW_POSITION.CENTER,
      Popover.ARROW_POSITION.RIGHT,
    ]),
    open: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.element,
  }

  static defaultProps = {
    arrowPosition: Popover.ARROW_POSITION.LEFT,
    open: false,
    className: '',
    children: null,
  }

  render (){
    const { children, arrowPosition, open, className, ...props } = this.props

    let arrowPositionStyle

    switch (arrowPosition) {
      case Popover.ARROW_POSITION.LEFT:
        arrowPositionStyle = css.arrowLeft
        break

      case Popover.ARROW_POSITION.CENTER:
        arrowPositionStyle = css.arrowCenter
        break

      case Popover.ARROW_POSITION.RIGHT:
        arrowPositionStyle = css.arrowRight
        break

      default:
        arrowPositionStyle = css.arrowLeft
    }

    let styles = [css.popover, open ? css.popoverVisible : '', css.popoverArrow, arrowPositionStyle, className]

    return(
      <div className={styles.join(' ')} {...props}>
        { children }
      </div>
    )
  }
}
