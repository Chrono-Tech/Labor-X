import PropTypes from 'prop-types'
import React from 'react'
import css from './Widget.scss'
import { Action } from 'components/common'

export default class Widget extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    className: PropTypes.string,
    actions: PropTypes.instanceOf(Array),
  }

  renderActions = () => (item, index) => <Action key={index} item={item} />

  render () {
    const { title, subtitle, actions, children } = this.props

    return (
      <div className={css.root}>
        <div className={css.header}>
          <h3 className={css.title}>{title}</h3>
          <div className={css.subtitle}>{subtitle}</div>
        </div>
        <p className={css.content}>{children}</p>
        {actions && actions.map(this.renderActions())}
      </div>
    )
  }
}
