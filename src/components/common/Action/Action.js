import React from 'react'
import PropTypes from 'prop-types'
import { Link, Image, Moment, Tip, Translate } from 'components/common/index'
import uniqid from 'uniqid'
import Counter from '../Counter/Counter'
import css from './Action.scss'

export default class Action extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      href: PropTypes.string,
      date: PropTypes.string,
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]).isRequired,
      firstIcon: PropTypes.shape({
        icon: PropTypes.string,
        color: PropTypes.string,
      }),
      secondIcon: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.shape({
          icon: PropTypes.string,
          color: PropTypes.string,
        })),
        PropTypes.shape({
          icon: PropTypes.string,
          color: PropTypes.string,
        }),
      ]),
      isLink: PropTypes.bool, // affect styles only
      isHeader: PropTypes.bool, // affect styles only
    }),
  }

  static getIcons (icons) {
    return Array.isArray(icons) ? icons : [icons]
  }

  render () {
    const { item } = this.props

    return (
      <Link href={item.href || '/'} className={css.root}>
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
        <div className={item.isLink ? css.link : css.action}><Translate className={item.isHeader ? css.header : null} value={item.label} /></div>
        {item.secondIcon && (
          Action.getIcons(item.secondIcon).map((icon) => (
            <div
              className={css.iconContainer}
              key={uniqid()}
            >
              {item.secondIconTip
                ? (
                  <Tip {...item.secondIconTip}>
                    <Image className={css.secondIcon} {...icon} />
                  </Tip>
                )
                : (
                  <Image className={css.secondIcon} {...icon} />
                )}
            </div>
          ))
        )}
        {item.counter && (
          <Counter {...item.counter} />
        )}
      </Link>
    )
  }
}
