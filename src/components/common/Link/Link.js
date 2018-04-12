import React from 'react'
import NextLink from 'next/link'
import PropTypes from 'prop-types'
import css from './Link.scss'

export default class Link extends React.Component {
  static propTypes = {
    href: PropTypes.string.isRequired,
    className: PropTypes.string,
    invert: PropTypes.bool,
  }

  render () {
    const classNames = [ this.props.invert ? css.linkInvert : css.link ]
    this.props.className && classNames.push(this.props.className)

    return (
      <NextLink href={this.props.href}>
        <a className={classNames.join(' ')}>
          {this.props.children}
        </a>
      </NextLink>
    )
  }
}
