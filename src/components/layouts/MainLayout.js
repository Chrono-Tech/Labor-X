import PropTypes from 'prop-types'
import React from 'react'
import css from './MainLayout.scss'
import { Header, SecondMenu, RightPanel } from 'components/layouts'

export default class MainLayout extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  }

  render () {
    return (
      <div>
        <div className={css.header}>
          <div className={css.headerWrapper}>
            <Header />
          </div>
        </div>
        <div className={css.page}>
          <div className={css.menu}>
            <SecondMenu />
          </div>
          <div className={css.main}>
            <h1>{this.props.title}</h1>
            <div className={css.content}>
              {this.props.children}
            </div>
          </div>
        </div>
        <RightPanel />
      </div>
    )
  }
}
