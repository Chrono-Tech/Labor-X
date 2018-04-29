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
    const { handleSubmit, error, pristine, invalid, avatar, title, subtitle, onClick, actionIcon } = this.props

    return (
      <div className={css.userBlock} onClick={onClick}>
        <div className={css.userBlockInner}>
          <div className={css.userBlockAvatar}>
            <img className={css.userAvatar} src={avatar} alt='' />
          </div>
          <div className={css.userBlockInfo}>
            { title ? (
              <div className={[css.title].join(' ')}>
                {title}
              </div>) : null}
            { subtitle ? (
              <div className={[css.subtitle].join(' ')}>
                {subtitle}
              </div>) : null}
          </div>
        </div>
        <div className={css.actionWrapper}>
          <button className={css.actionListTrigger}>
            <img src={actionIcon} alt='' />
          </button>
        </div>
      </div>
    )
  }
}
