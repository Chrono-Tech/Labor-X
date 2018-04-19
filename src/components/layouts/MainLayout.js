import { Header, RightPanel, SecondMenu } from 'components/layouts'
import PropTypes from 'prop-types'
import React from 'react'
import css from './MainLayout.scss'

export default class MainLayout extends React.Component {
  static propTypes = {
    isMenu: PropTypes.bool,
    customTitle: PropTypes.func,
  }

  static defaultProps = {
    isMenu: true,
  }

  render () {
    const { children, isMenu, customTitle } = this.props

    return (
      <div>
        <div className={css.header}>
          <div className={css.headerWrapper}>
            <Header />
          </div>
        </div>
        <div className={css.page}>
          {isMenu && (
            <div className={css.menu}>
              <SecondMenu />
            </div>
          )}
          {children}
        </div>
        <RightPanel />
      </div>
    )
  }
}
