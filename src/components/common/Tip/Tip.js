import PropTypes from 'prop-types'
import React from 'react'
import { Transition } from 'react-transition-group'
import css from './Tip.scss'
import { Translate } from 'components/common'

const DELAY = 250

const transitionStyles = {
  entering: {
    opacity: 0,
    visibility: 'visible',
  },
  entered: {
    opacity: 1,
    visibility: 'visible',
  },
  exiting: {
    opacity: 0,
    visibility: 'visible',
  },
  exited: {
    opacity: 0,
    visibility: 'hidden',
  },
}

export default class Tip extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    tip: PropTypes.string,
  }

  constructor () {
    super(...arguments)
    this.state = {
      isShow: false,
    }
  }

  handleMouseEnter = () => this.setState({ isShow: true })

  handleMouseLeave = () => this.setState({ isShow: false })

  renderTip = () => (state) => (
    <div className={css.root} style={transitionStyles[ state ]}>
      <div className={css.wrapper}>
        <div className={css.content}>
          {this.props.title && <div className={css.title}><Translate value={this.props.title} /></div>}
          <p><Translate value={this.props.tip} /></p>
        </div>
      </div>
    </div>
  )

  render () {
    return (
      <div
        className={css.pointer}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {this.props.children}
        <Transition
          in={this.state.isShow}
          timeout={DELAY}
        >
          {this.renderTip()}
        </Transition>

      </div>
    )
  }
}
