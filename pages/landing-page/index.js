import { Link, Carousel, Button } from 'components/common'
import { LoginOptions } from 'components/Login'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import initialStore from 'store'
import {bootstrap} from 'store/bootstrap'
import 'styles/globals/globals.scss'
import css from './index.scss'

class Index extends React.Component {
  static getInitialProps ({ store }) {
    store.dispatch(bootstrap())
  }
  
  constructor(){
    super()
    
    this.state = {
      activeIndex: 0
    }
  }
  
  goToNextSlide(){
    this.setState({activeIndex: this.state.activeIndex})
  }
  
  render () {
    return (
      <div className={css.root}>
        <div className={css.navWrapper}>
            <Button
              label={'New account'}
              onClick={() => {}}
              className={css.createButton}
            />
            <Button
              label={'Login'}
              onClick={() => {}}
              className={css.loginButton}
            />
      </div>
        <div className={css.sliderContainer}>
          <div className={css.logo}>
            <Link href='/'>
              <img src='/static/images/laborx-promo-head.jpg' className={css.logoImg} />
            </Link>
          </div>
          <Carousel>
            <a href='/'>
              <img src='/static/images/01_together-tobetter-future.jpg' />
            </a>
            <a href='/'>
              <img src='/static/images/02_work.jpg' />
            </a>
            <a href='/'>
              <img src='/static/images/03_labor-hour.jpg' />
            </a>
          </Carousel>
          <div>
            nextblock
          </div>
        </div>
      </div>
    )
  }
}

export default withRedux(initialStore)(Index)
