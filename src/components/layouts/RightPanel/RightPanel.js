import React from 'react'
import PropTypes from 'prop-types'

import { Action, Image } from 'components/common'
import { BalanceCollapsible } from 'src/partials'

import css from './RightPanel.scss'

const stats = [
  {
    href: '/',
    label: 'Messages',
    counter: { value: 1 },
  },
  {
    href: '/',
    label: 'Notification',
    counter: { value: 1 },
  },
  {
    href: '/',
    label: 'Job Boards',
    counter: { value: 1 },
  },
  {
    href: '/',
    label: 'Offers',
    counter: { value: 1 },
  },
  {
    href: '/',
    label: 'Opportunities',
    counter: { value: 135 },
  },
]

export default class RightPanel extends React.Component {
  static propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
  }

  renderActions = () => (item, index) => <Action key={index} item={item} />

  render () {
    const { onClose, open } = this.props

    return open ? (
      <div className={css.root}>
        <div className={css.overlay} onClick={() => onClose()} />
        <div className={css.content}>
          <div className={css.profileBox}>
            <Image
              href='/static/temp/icon-profile.jpg'
              className={css.avatar}
            />
            <h3 className={css.username}>user name</h3>
          </div>

          <div className={css.stats}>
            <div className={css.mainStat}>
              <div className={css.shield}>4</div>
              <div className={css.stars}>
                <Image className={css.star} {...Image.SETS.STAR} clickable={false} />
                <Image className={css.star} {...Image.SETS.STAR} clickable={false} />
                <Image className={css.star} {...Image.SETS.STAR} clickable={false} />
                <Image className={css.star} {...Image.SETS.STAR} clickable={false} />
                <Image className={css.star} {...Image.SETS.STAR} clickable={false} />
              </div>
            </div>
            {stats.map(this.renderActions())}
          </div>

          <BalanceCollapsible />

        </div>
      </div>
    ) : null
  }
}
