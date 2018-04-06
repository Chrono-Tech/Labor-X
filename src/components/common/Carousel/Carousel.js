import PropTypes from 'prop-types'
import { Link } from 'components/common'
import { HeaderLanding } from 'components/layouts'
import { LoginOptions } from 'components/Login'
import React from 'react'
import ReactDOM from 'react-dom'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'
import css from './Carousel.scss'

export default class Carousel extends React.Component {
  static propTypes = {
    interval: PropTypes.number,
  }
  
  static defaultProps = {
    interval: 3000,
  }
  
  constructor (){
    super()
    
    this.state = {
      activeIndex: 0,
      childHeight: null,
    }
  }
  
  timer (){
    let currentIndex = this.state.activeIndex
    let slideCount = this.props.children.length - 1
  
    if (currentIndex === slideCount){
      currentIndex = -1
    }
  
    console.log('count', currentIndex, slideCount)
  
    this.setState({ activeIndex: ++currentIndex })
  }
  
  updateDimensions () {
    this.setState({ childHeight: ReactDOM.findDOMNode(this.refs['carousel-0']) && ReactDOM.findDOMNode(this.refs['carousel-0']).clientHeight })
  }
  
  componentDidMount (){
    setInterval(this.timer.bind(this), this.props.interval)
    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions.bind(this))
  }
  
  goToNextSlide (){
    this.setState({ activeIndex: this.state.activeIndex++ })
  }
  
  render () {
    return (
      <div className={css.carousel} style={this.state.childHeight !== null ? { height: this.state.childHeight } : {}}>
        {
          React.Children.map(this.props.children, (slide, index) => (
            <div
              key={index}
              ref={`carousel-${index}`}
              className={[
                css.carouselItem,
                index === this.state.activeIndex ? css.carouselItemActive : '',
                this.state.childHeight === null && index === 0 ? css.carouselItemAlwaysVisible : ''].join(' ')}
            >
              {slide}
            </div>
          ))
        }
      </div>
    )
  }
}

