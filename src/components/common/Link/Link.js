import { Translate } from 'components/common'
import NextLink from 'next/link'
import PropTypes from 'prop-types'
import React from 'react'
import css from './Link.scss'

export default class Link extends React.Component {
  static propTypes = {
    href: PropTypes.string.isRequired,
    className: PropTypes.string,
    invert: PropTypes.bool,
    label: PropTypes.string,
  }

  render () {
    const { label, className, children } = this.props

    const classNames = [ this.props.invert ? css.linkInvert : css.link ]
    className && classNames.push(className)

    return (
      <NextLink href={this.props.href}>
        <a className={classNames.join(' ')}>
          {this.props.children}
        <a className={classNames.join(' ')} title={label}>
          {label
            ? <Translate value={label} />
            : children
          }
        </a>
      </NextLink>
    )
  }
}
