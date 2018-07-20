import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Translate } from 'components/common'
import { Link } from 'src/routes'
import { withRouter } from 'next/router'
import css from './Link.scss'

class LinkControl extends React.Component {
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

    const { label, className, children, href, invert, router, activeClassName } = this.props
    return (
      <Link route={href} href={href}>
        <a
          href={href}
          title={label}
          className={cn(
            href === router.route ? activeClassName : null,
            invert ? css.linkInvert : css.link,
            className
          )}
        >
          {label
            ? <Translate value={label} />
            : children
          }
        </a>
      </Link>
    )
  }
}

export default withRouter(LinkControl)
