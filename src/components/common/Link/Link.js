import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Translate } from 'components/common'
import Link from 'react-router-dom/Link'
import css from './Link.scss'

export default class LinkControl extends React.Component {
  static propTypes = {
    href: PropTypes.string.isRequired,
    className: PropTypes.string,
    invert: PropTypes.bool,
    label: PropTypes.string,
    router: PropTypes.shape({
      route: PropTypes.string,
    }),
    children: PropTypes.string,
    activeClassName: PropTypes.string,
  }

  render () {

    const { label, className, children, href, invert } = this.props
    return (
      <Link
        to={href}
        className={cn(
          invert ? css.linkInvert : css.link,
          className
        )}
      >
        {label
          ? <Translate value={label} />
          : children
        }
      </Link>
    )
  }
}
