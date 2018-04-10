import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import css from './ParallaxBox.scss'
import { Action } from 'components/common'

export default class ParallaxImage extends React.Component {
  static propTypes = {
    imgSrc: PropTypes.string,
    deflectionPercent: PropTypes.number,
  }
  
  static defaultProps = {
    imgSrc: '',
    deflectionPercent: 0
  }
  
  updateParams(child){
    this.setState({
      c1left: ReactDOM.findDOMNode(this._child).offsetLeft,
      c1top: ReactDOM.findDOMNode(this._child).offsetTop
    })
  }
  
  onMouseMove(event){
    const {deflectionPercent} = this.props
    let wrapper = ReactDOM.findDOMNode(this.refs.wrapper)
    let x = event.clientX,
      y = event.clientY;
    let speed = deflectionPercent
  
    let obj = ReactDOM.findDOMNode(this.refs.child)
    let rect = obj.getBoundingClientRect()
    let win = obj.ownerDocument.defaultView;
    let containerWidth = parseInt( wrapper.offsetWidth )
    let containerHeight = parseInt( wrapper.offsetHeight )
    let left = 0
    let top = 0
    obj.style.left = left - ( ( ( x - ( parseInt( obj.offsetWidth ) / 2 + left ) ) / containerWidth ) * speed ) + '%'
    obj.style.top = top - ( ( ( y - ( parseInt( obj.offsetHeight ) / 2 + top ) ) / containerHeight ) * speed ) + '%'

  }
  
  
  render () {
    const { children, imgSrc, deflectionPercent } = this.props
    let minSize = 100 + deflectionPercent;
    
    console.log('child', this.refs.child)
    
    return (
      <div className={css.root} ref='wrapper' onMouseMove={this.onMouseMove.bind(this)}>
        <div ref='child' className={css.imageWrapper}>
          { imgSrc ?
            <img style={{
              minWidth: `${minSize}%`,
              minHeight: `${minSize}%`,
              position: 'absolute',
            }}
                src={imgSrc}
                alt='' /> : null}
        </div>
        {children}
      </div>
    )
  }
}
