import PropTypes from 'prop-types'
import React from 'react'
import css from './Widget.scss'
import { Action } from 'components/common'

export default class ParallaxImage extends React.Component {
  static propTypes = {
  
  }
  
  mouseParallax ( obj, left, top, mouseX, mouseY, speed ) {
    // let obj = document.getElementById ( id );
    let parentObj = obj.parentNode,
      containerWidth = parseInt( parentObj.offsetWidth ),
      containerHeight = parseInt( parentObj.offsetHeight );
    obj.style.left = left - ( ( ( mouseX - ( parseInt( obj.offsetWidth ) / 2 + left ) ) / containerWidth ) * speed ) + 'px';
    obj.style.top = top - ( ( ( mouseY - ( parseInt( obj.offsetHeight ) / 2 + top ) ) / containerHeight ) * speed ) + 'px';
  }
  
  onMouseMove(event){
    let x = event.clientX - parallaxBox.offsetLeft,
      y = event.clientY - parallaxBox.offsetTop;
  
    mouseParallax ( 'l1', c1left, c1top, x, y, 100);
  }
  
  render () {
    const { children } = this.props
    
    return (
      <div className={css.root} onMouseMove={}>
      </div>
    )
  }
}
