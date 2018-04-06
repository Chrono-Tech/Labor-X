import { Translate } from 'components/common'
import { Header, RightPanel, SecondMenu } from 'components/layouts'
import PropTypes from 'prop-types'
import React from 'react'
import css from './MainLayout.scss'

export default class MainLayout extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    isMenu: PropTypes.bool,
  }

  static defaultProps = {
    isMenu: true,
  }

  render () {
    const { title, children, isMenu } = this.props

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
          <div className={css.main}>
            {title && <h1><Translate value={title} /></h1>}
            <div className={css.content}>
              {children}
            </div>
          </div>
        </div>
        <RightPanel />
      </div>
    )
  }
}
