import { Action, Image } from 'components/common'
import React from 'react'
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

  renderActions = () => (item, index) => <Action key={index} item={item} />

  render () {
    return (
      <div className={css.root}>
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

        </div>
      </div>
    )
  }
}
