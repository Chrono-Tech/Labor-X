import PropTypes from 'prop-types'
import React from 'react'
import { Translate } from 'components/common'
import css from './Tab.scss'

export default class Tab extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    classActive: PropTypes.string,
    index: PropTypes.number,
    title: PropTypes.string,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
  }

  constructor (...args) {
    super(...args)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.onClick(this.props.index)
  }

  render () {
    return (
      <div
        className={[this.props.className, this.props.isActive ? this.props.classActive : null].join(' ')}
        onClick={this.handleClick}
        onKeyPress={this.handleClick}
        tabIndex={0}
        role='button'
      >
        <Translate className={css.label} value={this.props.title} />
      </div>
    )
  }
}
