import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Translate } from 'components/common'
import NavLink from 'react-router-dom/NavLink'
import css from './Link.scss'

export default class Link extends React.Component {
  static propTypes = {
    href: PropTypes.string.isRequired,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    invert: PropTypes.bool,
    label: PropTypes.string,
    router: PropTypes.shape({
      route: PropTypes.string,
    }),
    children: PropTypes.node,
  }

  render () {

    const { label, className, activeClassName, children, href, invert } = this.props
    return (
      <NavLink
        to={href}
        className={cn(
          className,
          invert ? css.linkInvert : css.link,
        )}
        activeClassName={activeClassName ? activeClassName : null}
      >
        {label
          ? <Translate value={label} />
          : children
        }
      </NavLink>
    )
  }
}
