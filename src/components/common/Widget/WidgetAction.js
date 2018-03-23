import { Link, Icon, Moment, Tip } from 'components/common'
import PropTypes from 'prop-types'
import React from 'react'
import Counter from '../Counter/Counter'
import css from './WidgetAction.scss'

export default class WidgetAction extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      href: PropTypes.string.isRequired,
      date: PropTypes.string,
      label: PropTypes.string.isRequired,
      firstIcon: PropTypes.shape({
        name: PropTypes.string,
        color: PropTypes.string,
      }),
      secondIcon: PropTypes.shape({
        name: PropTypes.string,
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
          <Icon
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
                  <Icon className={css.secondIcon}{...item.secondIcon} />
                </Tip>
              )
              : (
                <Icon className={css.secondIcon}{...item.secondIcon} />
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
