import React from 'react'
import PropTypes from 'prop-types'
import css from './UserRow.scss'

export default class UserRow extends React.Component {
  static propTypes = {
    avatar: PropTypes.string,
    name: PropTypes.string,
    address: PropTypes.string,
    onClick: PropTypes.func,
    actionIcon: PropTypes.string,
  }
  
  static defaultProps = {
    avatar: '/static/images/profile-photo.jpg',
    name: '',
    address: '',
    onClick: () => {},
    actionIcon: '/static/images/svg/list.svg',
  }
  
  render () {
    const { handleSubmit, error, pristine, invalid, avatar, name, address, onClick, actionIcon } = this.props
    
    return (
      <div className={css.userBlock}>
        <div className={css.userBlockInner}>
          <div className={css.userBlockAvatar}>
            <img className={css.userAvatar} src={avatar} alt='' />
          </div>
          <div className={css.userBlockInfo}>
            { name ? (
              <div className={css.userName}>{name}</div>
            ) : null}
            <div className={css.userAddress}>{address}</div>
          </div>
        </div>
        <div className={css.actionWrapper}>
          <button className={css.actionListTrigger} onClick={ onClick }>
            <img src={actionIcon} alt='' />
          </button>
        </div>
      </div>
    )
  }
}
