import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import css from './ParallaxBox.scss'
import { Action } from 'components/common'

export default class ParallaxImage extends React.Component {
  static propTypes = {
    imgSrc: PropTypes.string,
    deflectionPercent: PropTypes.number,
    imageStyles: PropTypes.oneOf([PropTypes.object, PropTypes.array]),
    addClassOnScrollEvent: PropTypes.oneOf([PropTypes.string, PropTypes.array]),
  }
  
  static defaultProps = {
    imgSrc: '',
    deflectionPercent: 0,
    imageStyles: []
  }
  
  constructor(){
    super()
    this.state = {
      isScrollWasFired: false
    }
  }
  
  componentDidMount(){
    this.scrollCallback()
    window.addEventListener('scroll', this.scrollCallback.bind(this))
  }
  
  scrollCallback(){
    let rect = this.refs.wrapper.getBoundingClientRect()
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop
    let clientHeight = document.documentElement.clientHeight


    if (rect.top + rect.height * 1/2 <= clientHeight && rect.top + rect.height > 0) {
      if (!this.state.isScrollWasFired){
        this.setState({isScrollWasFired: true})
      }
    }
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
    const { children, imgSrc, deflectionPercent, imageStyles } = this.props
    let minSize = 100 + deflectionPercent;
    let styles = {
      minWidth: `${minSize}%`,
      minHeight: `${minSize}%`,
    }
    
    let newStyles = {
      ...styles,
      ...imageStyles
    }
    
    return (
      <div className={[css.root, this.state.isScrollWasFired ? 'animation-fired' : ''].join(' ')} ref='wrapper' onMouseMove={this.onMouseMove.bind(this)}>
        <div ref='child' className={css.imageWrapper}>
          { imgSrc ?
            <img style={styles}
                 className={css.image}
                 src={imgSrc}
                 alt='' /> : null}
        </div>
        {children}
      </div>
    )
  }
}
