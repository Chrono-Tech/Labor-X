import { Link, Image, Moment, Tip } from 'components/common/index'
import PropTypes from 'prop-types'
import React from 'react'
import Counter from '../Counter/Counter'
import css from './Action.scss'

export default class Action extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      href: PropTypes.string.isRequired,
      date: PropTypes.string,
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]).isRequired,
      firstIcon: PropTypes.shape({
        icon: PropTypes.string,
        color: PropTypes.string,
      }),
      secondIcon: PropTypes.shape({
        icon: PropTypes.string,
        color: PropTypes.string,
      }),
      isLink: PropTypes.bool, // affect styles only
    }),
  }

  render () {
    const { item } = this.props

    return (
      <Link href={item.href} className={css.root}>
        {item.date && (
          <div className={css.date}>
            <Moment value={item.date} />
          </div>
        )}
        {item.firstIcon && (
          <Image
            className={css.firstIcon}
            {...item.firstIcon}
          />
        )}
        <div className={item.isLink ? css.link : css.action}>{item.label}</div>
        {item.secondIcon && (
          <div>
            {item.secondIconTip
              ? (
                <Tip {...item.secondIconTip}>
                  <Image className={css.secondIcon} {...item.secondIcon} />
                </Tip>
              )
              : (
                <Image className={css.secondIcon} {...item.secondIcon} />
              )}
          </div>
        )}
        {item.counter && (
          <Counter {...item.counter} />
        )}
      </Link>
    )
  }
}
