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
    content: PropTypes.arrayOf(PropTypes.shape({
      link: PropTypes.string,
      imgSrc: PropTypes.string,
    })),
  }
  
  static defaultProps = {
    interval: 3000,
    content: [],
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
    let slideCount = this.props.content.length - 1
  
    if (currentIndex === slideCount){
      currentIndex = -1
    }
    
    this.setState({ activeIndex: ++currentIndex })
  }
  
  updateDimensions () {
    const firstChild = this.refs['carousel-0'] && ReactDOM.findDOMNode(this.refs['carousel-0'])
    
    if (firstChild) {
      this.setState({ childHeight: firstChild.clientHeight })
    }
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
          this.props.content.map((slide, index) => {
            const imgProps = {
              ...(index === 0 ? {onLoad: this.updateDimensions.bind(this)} : {}),
              src: slide.imgSrc,
              alt: ''
            }
            
            return (
            <div
              key={index}
              ref={`carousel-${index}`}
              className={[
                css.carouselItem,
                index === this.state.activeIndex ? css.carouselItemActive : '',
                this.state.childHeight === null && index === 0 ? css.carouselItemAlwaysVisible : ''].join(' ')}
            >
              {
                slide.link ? (
                  <a href={slide.link}>
                    <img {...imgProps} />
                  </a>
                ) : (<img {...imgProps} />)
              }
            </div>
          )})
        }
      </div>
    )
  }
}

