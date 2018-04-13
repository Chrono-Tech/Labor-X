import PropTypes from 'prop-types'
import React from 'react'
import css from './Paper.scss'

export default class Paper extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
  }

  render () {
    const classNames = [ css.root ]
    this.props.className && classNames.push(this.props.className)

    return (
      <div className={classNames.join(' ')}>
        {this.props.children}
      </div>
    )
  }
}
