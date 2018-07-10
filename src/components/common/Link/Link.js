import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Translate } from 'components/common'
import { Link } from 'src/routes'
import { withRouter } from 'next/router'
import css from './Link.scss'

class LinkControl extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node), PropTypes.string]),
    href: PropTypes.string.isRequired,
    activeClassName: PropTypes.string,
    invert: PropTypes.bool,
    label: PropTypes.string,
    router: PropTypes.shape({
      route: PropTypes.string,
    }),
  }

  render () {
    const { label, className, children, activeClassName, href, invert, router } = this.props
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
