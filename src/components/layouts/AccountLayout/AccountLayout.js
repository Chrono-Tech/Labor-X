import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'

import { Link } from 'components/common'
import 'styles/globals/globals.scss'
import css from './AccountLayout.scss'

export default class AccountLayout extends React.Component {
  constructor(props){
    super(props)
    
    this.state = {
      activePage: 0,
    }
  }
  
  navigateBack() {
    if (this.state.activePage - 1  >= 0) {
      this.setState({activePage: this.state.activePage - 1})
    }
  }
  
  navigateNext() {
    if (this.state.activePage + 1 <= this.props.children.length) {
      this.setState({activePage: this.state.activePage + 1})
    }
  }
  
  renderChildren(){
    const pageProps = {
      navigateBack: this.navigateBack.bind(this),
      navigateNext: this.navigateNext.bind(this),
      onSubmitSuccess: this.navigateNext.bind(this),
    }
    
    return React.Children.map(this.props.children, (item, index) => (
      <div className={[css.page, this.state.activePage === index ? css.activeSlide : ''].join(' ')}>
        { React.cloneElement(item, pageProps) }
      </div>
    ))
  }
  
  render () {
    const { contentClassName, title } = this.props
    
    const contentClassNames = [css.main].concat(contentClassName)
    
    return (
      <div className={css.root}>
        <div className={css.contentWrapper}>
          <div className={css.header}>
            <div className={css.headerInner}>
              <Link href='/'>
                <img src='/static/images/svg/laborx-white.svg' alt='' />
              </Link>
            </div>
          </div>
          <div className={css.topSection}>
            <img className={css.background} src='/static/images/city-5.jpg' alt='' />
        
            <div className={css.topSectionBlock}>
              <span onClick={this.navigateBack.bind(this)} className={css.backLink}>
                <img src='/static/images/svg/back.svg' alt='' />
              </span>
          
              <Link href='/' className={css.helpLink}>
                <img src='/static/images/svg/help-white.svg' alt='' />
              </Link>
              { title ? (<h1>{ title }</h1>) : null }
            </div>
          </div>
          <div className={contentClassNames.join(' ')}>
            { this.renderChildren() }
          </div>
          <Link href='/' className={css.footerLogo}>
            <img src='/static/images/svg/laborx-caption.svg' alt='' />
          </Link>
        </div>
      </div>
    )
  }
}
