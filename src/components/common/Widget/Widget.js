import { Action, Translate } from 'components/common'
import PropTypes from 'prop-types'
import React from 'react'
import css from './Widget.scss'

const BLUE = 'Blue'
const WHITE = 'White'

export default class Widget extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    href: PropTypes.string,
    subtitle: PropTypes.string,
    className: PropTypes.string,
    headerTheme: PropTypes.oneOf([BLUE, WHITE]),
    actions: PropTypes.instanceOf(Array),
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  }

  static defaultProps = {
    headerTheme: BLUE,
  }

  static THEMES = {
    BLUE,
    WHITE,
  }

  constructor (props, context){
    super(props, context)
    this.header = this.header.bind(this)
  }

  header () {
    return (
      <div className={css[`header${this.props.headerTheme}`]}>
        <h3 className={css[`title${this.props.headerTheme}`]}><Translate value={this.props.title} /></h3>
        {this.props.subtitle && <div className={css[`subtitle${this.props.headerTheme}`]}><Translate value={this.props.subtitle} /></div>}
      </div>
    )
  }

  renderActions = () => (item, index) => <Action key={index} item={item} />

  render () {
    const { actions, children, href } = this.props

    return (
      <div className={css.root}>
        { href ? <a href={href}>{this.header()}</a> : this.header() }
        {children && <div className={css.content}>{children}</div>}
        {actions && actions.map(this.renderActions())}
      </div>
    )
  }
}
