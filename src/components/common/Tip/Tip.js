import PropTypes from 'prop-types'
import React from 'react'
import { Transition } from 'react-transition-group'

import { Translate } from 'components/common'

import css from './Tip.scss'
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
  static POSITION = {
    LEFT: 'left',
    CENTER: 'center',
    RIGHT: 'right',
  }
  
  static propTypes = {
    title: PropTypes.string,
    tip: PropTypes.string,
    tipContent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    tipClassName: PropTypes.string,
    position: PropTypes.oneOf([
      Tip.POSITION.LEFT,
      Tip.POSITION.CENTER,
      Tip.POSITION.RIGHT,
    ]),
  }
  
  static defaultProps = {
    position: Tip.POSITION.RIGHT,
    title: '',
    tip: '',
    tipClassName: '',
    tipContent: null,
  }

  constructor () {
    super(...arguments)
    this.state = {
      isShow: false,
    }
  }

  handleMouseEnter = () => this.setState({ isShow: true })

  handleMouseLeave = () => this.setState({ isShow: false })
  
  getArrowPosition(){
    const { position } = this.props
    
    
    switch (position) {
      case Tip.POSITION.LEFT:
        return css.arrowLeft
    
      case Tip.POSITION.CENTER:
        return css.arrowCenter
    
      case Tip.POSITION.RIGHT:
        return css.arrowRight
    
      default:
        return css.arrowRight
    }
  }
  
  renderTipContent(){
    const { tipContent } = this.props
    
    if (tipContent){
      return (<div className={css.content}>{ tipContent }</div>)
    }
    
    return (
      <div className={css.content}>
        {this.props.title && <div className={css.title}><Translate value={this.props.title} /></div>}
        <p><Translate value={this.props.tip} /></p>
      </div>
    )
  }

  renderTip = () => (state) => (
    <div className={css.root} style={transitionStyles[ state ]}>
      <div className={[css.wrapper, this.getArrowPosition(), this.props.tipClassName].join(' ')}>
        { this.renderTipContent()}
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
