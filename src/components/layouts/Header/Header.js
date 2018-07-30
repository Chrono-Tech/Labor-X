import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Tip } from 'src/components/common'
import { RightPanel } from 'src/components/layouts'
import { userSelector, logout } from "src/store"
import { UserAccountTypesModel } from "src/models"
import { NotificationWidget } from "src/partials"
import ProfileModel from 'src/api/backend/model/ProfileModel'
import FirstMenu from '../FirstMenu/FirstMenu'
import css from './Header.scss'

export class Header extends React.Component {

  static propTypes = {
    handleLogout: PropTypes.func.isRequired,
    accountTypes: PropTypes.instanceOf(UserAccountTypesModel),
    avatar: PropTypes.shape({
      url: PropTypes.string,
    }),
    validationLevel: PropTypes.number,
  }

  constructor (){
    super()

    this.state = {
      isVisibleRightPanel: false,
    }
  }

  handleOpenPanel = () => {
    this.setState({ isVisibleRightPanel: true })
    document.body.classList.add('show-overlay')
  }

  handleClosePanel = () => {
    this.setState({ isVisibleRightPanel: false })
    document.body.classList.remove('show-overlay')
  }

  render () {
    const prefix = this.constructor.name
    const { avatar, validationLevel } = this.props
    return (
      <div className={css.root}>
        <div className={css.headerLeft}>
          <Link href='/' className={css.logo}>
            <img alt='logo' src='/static/images/labor-x-logo.svg' className={css.logoImg} />
          </Link>
          <FirstMenu />
        </div>
        <div className={css.headerRight}>
          <nav className={css.actions}>
            { this.props.accountTypes.client ? <Link href='/job-types' className={css.actionItem} label='nav.newJob' /> : null }
            { this.props.accountTypes.client ? <Link href='/create-job-board' className={css.actionItem} label='nav.newBoard' /> : null }
            <button className={css.actionItem} onClick={this.props.handleLogout}>Log out</button>
          </nav>
          <div className={css.points}>
            <Tip
              title={`${prefix}.actionPoints`}
              tip={`${prefix}.actionPointsDescription`}
            >
              <img alt='active-points-icon' src='/static/images/icon-active-points.svg' className={css.pointsIcon} />
            </Tip>
            <span className={css.pointsValue}>70</span>
          </div>

          <NotificationWidget
            className={css.notifications}
          />

          <div className={css.profile}>
            <div className={css.profileWrapper} onClick={this.handleOpenPanel}>
              <div className={css.userBlockAvatar}>
                <div
                  className={css.userAvatar}
                  style={{ "background": `url(${(avatar && avatar.url) || '/static/temp/icon-profile.jpg'}) no-repeat center/cover` }}
                >
                  <div className={css.profileCounter}>99</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <RightPanel open={this.state.isVisibleRightPanel} onClose={this.handleClosePanel} validationLevel={validationLevel} />

      </div>
    )
  }
}

const mapStateToProps = state => {
  const user = userSelector()(state)
  const profile = ProfileModel.fromJson(user.profile)
  return {
    accountTypes: user.accountTypes,
    avatar: profile.level1.getApprovedAvatar(),
    validationLevel: profile.getValidationLevel(),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    handleLogout: () => {
      dispatch(logout())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
