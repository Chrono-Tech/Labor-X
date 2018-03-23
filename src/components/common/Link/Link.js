import React from 'react'
import NextLink from 'next/link'
import PropTypes from 'prop-types'

export default class Link extends React.Component {
  static propTypes = {
    href: PropTypes.string.isRequired,
    className: PropTypes.string,
  }

  render () {
    return (
      <NextLink href={this.props.href}>
        <a className={this.props.className}>
          {this.props.children}
        </a>
      </NextLink>
    )
  }
}
