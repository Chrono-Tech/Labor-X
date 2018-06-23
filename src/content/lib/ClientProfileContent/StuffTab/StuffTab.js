import React from 'react'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import { Icon } from 'src/components/common'
import { ProfileModel } from 'src/models'
import css from './StuffTab.scss'

export default class StuffTab extends React.Component {
  static propTypes = {
    stuff: PropTypes.arrayOf(PropTypes.instanceOf(ProfileModel)),
  }

  handleClickEdit = () => {
    // eslint-disable-next-line no-console
    console.log('ClientProfileContent-StuffTab-handleClickEdit')
  }

  render () {
    const { stuff } = this.props
    return (
      <div className={css.content}>
        { stuff.map( worker => (
          <div className={css.workerCard} key={uniqid()}>
            <div className={css.worker}>
              <img src={worker.ipfs.logo} alt={worker.ipfs.name} />
              <p>{worker.ipfs.name}</p>
            </div>
            <Icon
              className={css.icon}
              icon={Icon.ICONS.EDIT}
              color={Icon.COLORS.GREY30}
              size={28}
              onClick={this.handleClickEdit}
            />
          </div>
        )) }
      </div>
    )
  }
}
