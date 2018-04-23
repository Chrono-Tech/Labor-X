import { Action, Translate } from 'components/common'
import PropTypes from 'prop-types'
import React from 'react'
import css from './Widget.scss'

const BLUE = 'blue'
const WHITE = 'white'

export default class Widget extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    className: PropTypes.string,
    headerTheme: PropTypes.oneOf([BLUE, WHITE]),
    actions: PropTypes.instanceOf(Array),
  }

  static defaultProps = {
    headerTheme: BLUE,
  }

  static THEMES = {
    BLUE,
    WHITE,
  }

  renderActions = () => (item, index) => <Action key={index} item={item} />

  render () {
    const { title, subtitle, actions, children, headerTheme } = this.props

    return (
      <div className={css.root}>
        <div className={css[`header-${headerTheme}`]}>
          <h3 className={css[`title-${headerTheme}`]}><Translate value={title}/></h3>
          {subtitle && <div className={css[`subtitle-${headerTheme}`]}><Translate value={subtitle}/></div>}
        </div>
        {children && <p className={css.content}>{children}</p>}
        {actions && actions.map(this.renderActions())}
      </div>
    )
  }
}
