import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import css from './ParallaxBox.scss'

export default class ParallaxBox extends React.Component {
  static propTypes = {
    imgSrc: PropTypes.string,
    deflectionPercent: PropTypes.number,
    addClassOnScrollEvent: PropTypes.oneOf([PropTypes.string, PropTypes.array]),
    imageClassName: PropTypes.string,
    className: PropTypes.string,
  }
  
  static defaultProps = {
    imgSrc: '',
    deflectionPercent: 0,
    imageClassName: '',
    className: '',
  }
  
  constructor (){
    super()
    this.state = {
      isScrollWasFired: false,
    }
  }
  
  componentDidMount (){
    this.scrollCallback()
    window.addEventListener('scroll', this.scrollCallback.bind(this))
  }
  
  scrollCallback (){
    let rect = this.refs.wrapper.getBoundingClientRect()
    let clientHeight = document.documentElement.clientHeight

    if (rect.top + rect.height * 1/2 <= clientHeight && rect.top + rect.height > 0) {
      if (!this.state.isScrollWasFired){
        this.setState({ isScrollWasFired: true })
      }
    }
  }
  
  onMouseMove (event){
    const { deflectionPercent } = this.props
    let wrapper = ReactDOM.findDOMNode(this.refs.wrapper)
    let x = event.clientX,
      y = event.clientY
    let speed = deflectionPercent
  
    let obj = ReactDOM.findDOMNode(this.refs.child)
    let containerWidth = parseInt( wrapper.offsetWidth )
    let containerHeight = parseInt( wrapper.offsetHeight )
    let left = 0
    let top = 0
    obj.style.left = left - ( ( ( x - ( parseInt( obj.offsetWidth ) / 2 + left ) ) / containerWidth ) * speed ) + '%'
    obj.style.top = top - ( ( ( y - ( parseInt( obj.offsetHeight ) / 2 + top ) ) / containerHeight ) * speed ) + '%'

  }
  
  render () {
    const { children, imgSrc, className, imageClassName, deflectionPercent } = this.props
    const imageClassNames = [css.image].concat(imageClassName)
    const classNames = ['ParallaxBox', css.root, this.state.isScrollWasFired ? 'animation-fired' : ''].concat(className)
    let minSize = 100 + deflectionPercent
    let styles = {
      minWidth: `${minSize}%`,
      minHeight: `${minSize}%`,
    }
    
    return (
      <div
        ref='wrapper'
        className={classNames.join(' ')}
        onMouseMove={ deflectionPercent ? this.onMouseMove.bind(this) : null}>
        <div ref='child' className={css.imageWrapper}>
          { imgSrc ?
            <img
              style={styles}
              className={imageClassNames.join(' ')}
              src={imgSrc}
              alt=''
            /> : null}
        </div>
        {children}
      </div>
    )
  }
}
