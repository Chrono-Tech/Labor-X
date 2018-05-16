import { Translate } from 'components/common'
import { Link } from 'src/routes'
import PropTypes from 'prop-types'
import React from 'react'
import css from './Link.scss'

export default class LinkControl extends React.Component {
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
      <Link route={this.props.href}>
        <a className={classNames.join(' ')} title={label}>
          {label
            ? <Translate value={label} />
            : children
          }
        </a>
      </Link>
    )
  }
}
